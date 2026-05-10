import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./backend/auth";

function getHostname(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || "";
  return host.split(":")[0].toLowerCase();
}

function isAdminSubdomain(hostname: string): boolean {
  const configuredAdminHost = process.env.ADMIN_HOSTNAME?.toLowerCase();
  if (configuredAdminHost) {
    return hostname === configuredAdminHost;
  }
  return hostname.startsWith("admin.");
}

export async function proxy(request: NextRequest) {
  const hostname = getHostname(request);
  const pathname = request.nextUrl.pathname;
  const adminHost = isAdminSubdomain(hostname);

  // On admin subdomain, funnel users into quantumwool routes only.
  if (adminHost && !pathname.startsWith("/quantumwool")) {
    const url = request.nextUrl.clone();
    url.pathname = "/quantumwool/login";
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith("/quantumwool")) {
    if (request.nextUrl.pathname === "/quantumwool/login") {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("admin_session")?.value;
    const payload = sessionCookie ? await verifySession(sessionCookie) : null;

    if (!payload) {
      const url = request.nextUrl.clone();
      url.pathname = "/quantumwool/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
