// middleware.js（プロジェクト直下）
import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  if (url.pathname.startsWith("/video/hls/")) {
    const referer = req.headers.get("referer") || "";
    const sameOrigin = referer.startsWith(`${url.origin}/`);
    if (!sameOrigin) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/video/hls/:path*"],
};
