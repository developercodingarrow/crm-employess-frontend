// middleware.js
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/profile", "/settings"];
// Public routes that don't require authentication
const publicRoutes = ["/auth/login"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get cookies
  const token = request.cookies.get("jwt")?.value;
  const user = request.cookies.get("user")?.value;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/api/auth/"),
  );

  // If no token and trying to access protected route → redirect to login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists and trying to access login/register → redirect to dashboard
  if (token && isPublicRoute && !pathname.startsWith("/api/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
