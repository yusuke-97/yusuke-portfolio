import { NextResponse } from "next/server";

const COOKIE_NAME = "hls_token";
const encoder = new TextEncoder();

function getCookie(header, name) {
  if (!header) return null;
  const m = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function hmacHex(data, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const bytes = new Uint8Array(sigBuf);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, "0");
  return hex;
}

export async function middleware(req) {
  const { nextUrl } = req;
  const path = nextUrl.pathname;

  if (path.startsWith("/video/") && /\.(mp4|mov|webm)$/i.test(path)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (!path.startsWith("/video/hls/")) {
    return NextResponse.next();
  }

  const secret = process.env.HLS_TOKEN_SECRET;
  if (!secret) return new NextResponse("Server misconfig", { status: 500 });

  const referer = req.headers.get("referer") || "";
  const sfs = req.headers.get("sec-fetch-site") || "";
  const sameOrigin = referer.startsWith(`${nextUrl.origin}/`);
  const sameSite = sfs === "same-origin" || sfs === "same-site";
  if (!(sameOrigin || sameSite)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const token = getCookie(cookieHeader, COOKIE_NAME);
  if (!token) return new NextResponse("Forbidden", { status: 403 });

  const [expStr, sig] = token.split(".");
  const exp = parseInt(expStr, 10);
  if (!exp || !sig) return new NextResponse("Forbidden", { status: 403 });
  if (Math.floor(Date.now() / 1000) > exp) return new NextResponse("Expired", { status: 403 });

  const ua = req.headers.get("user-agent") || "";
  const data = `${exp}.${ua}`;
  const expected = await hmacHex(data, secret);
  if (!safeEqual(sig, expected)) return new NextResponse("Forbidden", { status: 403 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/video/:path*"],
};
