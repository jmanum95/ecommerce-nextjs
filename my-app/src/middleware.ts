import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ["/my-account", "/cart"];
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const cookie = await cookies();
  const sessionCookie = cookie.get("session")?.value;
  
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  } else {
    return NextResponse.next();
  }
}
