import { NextResponse } from "next/server";

export function middleware(req) {
  const { nextUrl } = req;
  const referer = req.headers.get("referer") || "";
  const sameOrigin = referer.startsWith(`${nextUrl.origin}/`);

  if (nextUrl.pathname.startsWith("/video/hls/") && !sameOrigin) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/video/hls/:path*"],
};
