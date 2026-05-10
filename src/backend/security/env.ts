function requireEnv(name: string, minLength = 1): string {
  const value = process.env[name];
  if (!value || value.trim().length < minLength) {
    throw new Error(`${name} is required and must be at least ${minLength} characters.`);
  }
  return value.trim();
}

export function getAuthSecret(): string {
  return requireEnv("NEXTAUTH_SECRET", 32);
}

export function getAdminPassword(): string {
  return requireEnv("ADMIN_PASSWORD", 8);
}
