import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { getAuthSecret } from "@/backend/security/env";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24;

type SessionPayload = {
  sub: "admin";
  role: "administrator";
};

export async function createSession(payload: SessionPayload) {
  const key = new TextEncoder().encode(getAuthSecret());
  const now = Math.floor(Date.now() / 1000);
  const expires = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(payload.sub)
    .setIssuer("wool-power")
    .setAudience("wool-power-admin")
    .setJti(randomUUID())
    .setIssuedAt(now)
    .setNotBefore(now)
    .setExpirationTime(now + SESSION_TTL_SECONDS)
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires,
    path: "/",
  });
}

export async function verifySession(session: string) {
  try {
    const key = new TextEncoder().encode(getAuthSecret());
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
      issuer: "wool-power",
      audience: "wool-power-admin",
    });

    if (payload.sub !== "admin" || payload.role !== "administrator") {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
