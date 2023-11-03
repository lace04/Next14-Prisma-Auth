export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*'], // https://nextjs.org/docs/api-routes/dynamic-api-routes#optional-catch-all-routes
};
