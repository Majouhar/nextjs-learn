import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { i18n } from "./i18n";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { Negotiator } from "negotiator";

function getLocale(request) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}
const PUBLIC_FILE = /\.(.*)$/;
export default async function middleware(req, event) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const pathname = req.nextUrl.pathname;
  const localeInPathName = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  var locale = localeInPathName;
  if (!locale) {
    locale = getLocale(req);
  }

  if (
    !localeInPathName &&
    !(
      pathname.startsWith("/_next") ||
      pathname.includes("/api/") ||
      PUBLIC_FILE.test(pathname)
    )
  ) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url
      )
    );
  }
  if (pathname.startsWith(`/${locale}/login`) && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}/meals`, req.url));
  } else if (pathname.startsWith("/api/form") && !isAuthenticated) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 404 });
  } else if (pathname === `/${locale}`) {
    return NextResponse.next();
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/${locale}/login`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
