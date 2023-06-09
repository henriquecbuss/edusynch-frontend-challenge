import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/", "/api*", "/.*.(png|svg|ico)", "/site.webmanifest"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
