import { auth } from "@/auth";

const proxyHandler = auth((req) => {
  if (process.env.NEXT_PUBLIC_SKIP_AUTH === "true") return;
  
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

  if (isAuthPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", req.nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export default function proxy(req: any, ctx: any) {
  return proxyHandler(req, ctx);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
