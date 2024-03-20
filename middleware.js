import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req, event) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/meals", req.url));
  } else if (req.nextUrl.pathname.startsWith("/api/form") && !isAuthenticated) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 404 });
  } else if (req.nextUrl.pathname === "/" ) {
    return NextResponse.next();
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
