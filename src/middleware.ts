import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // list of all locales
  locales: ['en', 'ko'],
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ko)/:path*'],
};
