import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (!req.auth && (pathname.startsWith("/dashboard") || pathname.startsWith("/bill"))) {
    const loginUrl = new URL("/login", req.url);

    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/bill/:path*"],
};