"use server";

import { createSession, deleteSession } from "@/backend/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { timingSafeEqual, createHash } from "crypto";
import { canAttemptLogin, recordFailedLogin, recordSuccessfulLogin } from "@/backend/security/rateLimit";
import { SITE_CONFIG } from "@/config/site";
import { getAdminPassword } from "@/backend/security/env";

// Zod Schema for mathematical input validation
const loginSchema = z.object({
  email: z.string().email("Invalid email format").min(5).max(100),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
});

/** Timing-safe string comparison to prevent timing attacks. */
function safeCompare(a: string, b: string): boolean {
  const bufA = createHash('sha256').update(a).digest();
  const bufB = createHash('sha256').update(b).digest();
  return timingSafeEqual(bufA, bufB);
}

type LoginState = { error?: string };

export async function login(_prevState: LoginState | undefined, formData: FormData): Promise<LoginState> {
  // 1. Extract raw data
  const rawEmail = formData.get('email');
  const rawPassword = formData.get('password');

  // 2. Strict Zod Validation (Zero Trust)
  const validationResult = loginSchema.safeParse({ email: rawEmail, password: rawPassword });
  
  if (!validationResult.success) {
    return { error: validationResult.error.issues[0]?.message || "Invalid input." };
  }

  const { email, password } = validationResult.data;
  const rateLimitKey = createHash("sha256").update(email.toLowerCase()).digest("hex");
  const rateLimitResult = canAttemptLogin(rateLimitKey);

  if (!rateLimitResult.ok) {
    return { error: `Too many login attempts. Retry in ${rateLimitResult.retryAfterSec}s.` };
  }

  // Use environment variables for secure admin check
  const adminEmail = SITE_CONFIG.adminEmail;
  const adminPassword = getAdminPassword();

  // 3. Timing-safe comparison (prevents timing-based password guessing)
  const emailMatch = safeCompare(email, adminEmail);
  const passwordMatch = safeCompare(password, adminPassword);

  if (emailMatch && passwordMatch) {
    recordSuccessfulLogin(rateLimitKey);
    await createSession({ sub: "admin", role: "administrator" });
    redirect("/quantumwool");
  }

  recordFailedLogin(rateLimitKey);
  return { error: "Invalid email or password" };
}

export async function logout() {
  await deleteSession();
  redirect("/quantumwool/login");
}
