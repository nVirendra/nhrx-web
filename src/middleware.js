import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];
const ADMIN_PREFIX = "/admin";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
