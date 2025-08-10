import { NextResponse } from "next/server";
import crypto from "crypto";

const TTL_SEC = 60 * 2;
const COOKIE_NAME = "hls_token";

export async function GET(req) {
  const secret = process.env.HLS_TOKEN_SECRET;
  if (!secret) return NextResponse.json({ ok:false }, { status:500 });

  const url = new URL(req.url);
  const referer = req.headers.get("referer") || "";
  const sfs = req.headers.get("sec-fetch-site") || "";
  const sameOrigin = referer.startsWith(`${url.origin}/`);
  const sameSite = sfs === "same-origin" || sfs === "same-site";
  if (!(sameOrigin || sameSite)) {
    return NextResponse.json({ ok:false }, { status:403 });
  }

  const exp = Math.floor(Date.now()/1000) + TTL_SEC;
  const ua = req.headers.get("user-agent") || "";
  const sig = crypto.createHmac("sha256", secret).update(`${exp}.${ua}`).digest("hex");
  const token = `${exp}.${sig}`;

  const res = NextResponse.json({ ok:true, exp });
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
    path: "/video/hls",
    maxAge: TTL_SEC,
  });
  return res;
}
