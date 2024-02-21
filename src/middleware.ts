import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  // her kan vi legg til routes som skal være offentlige og ikke begrenset at innlogging
  publicRoutes: [
    "/home",
    "/dashboard",
    "/browse",
    "/profile",
    "/",
    "/gamePage",
  ],
});

export const config = {
  // do not touch this line
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
