import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoute = [
  "/profile",
  "/historiques",
  "/transaction",
  "/transaction/send",
  "/transaction/receive",
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken")?.value;
  const actualUrl = request.nextUrl.pathname;

  if (accessToken === undefined && privateRoute.includes(actualUrl)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else if (accessToken !== undefined && actualUrl.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile",
    "/historiques",
    "/transaction",
    "/auth/login",
    "/auth/register",
    "/transaction/send",
    "/transaction/receive",
  ],
};
