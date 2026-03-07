// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("jwt")?.value;
  const userString = request.cookies.get("user")?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't need authentication
  const publicPaths = ["/auth/login"];

  // Check if current path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // For all other paths, check if user is authenticated
  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Parse user data
  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch {
    // If user cookie is invalid, redirect to login
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 👇 ROLE-BASED ACCESS RULES
  const userRole = user?.role;

  // Admin only routes
  const adminRoutes = [
    "/admin",
    "/admin/users",
    "/admin/leads",
    "/admin/projects",
  ];

  // Shared routes (accessible by both admin and employee)
  const sharedRoutes = [
    "/create-project", // ✅ Both can access
  ];

  // Employee routes (accessible by both)
  const employeeRoutes = ["/"];

  // Check if current path is admin-only
  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Check if current path is shared
  const isSharedRoute = sharedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Check if current path is employee route
  const isEmployeeRoute = employeeRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // If it's an admin route but user is not admin
  if (isAdminRoute && userRole !== "admin") {
    // Redirect employees to their dashboard
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If it's an employee route but user is admin, redirect to admin dashboard
  if (isEmployeeRoute && userRole === "admin" && pathname === "/") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // ✅ Shared routes - allow both admin and employee
  if (isSharedRoute) {
    return NextResponse.next();
  }

  // Allow access
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
