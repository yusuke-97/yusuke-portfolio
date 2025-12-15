import { NextResponse } from "next/server";
import { createHash } from "crypto";

// Basic, server-side validation helpers
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX = 5;
const rateBuckets = new Map();

const getIp = (req) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("x-real-ip") ||
  "";

const withinRateLimit = (ip) => {
  if (!ip) return true;
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.ts > RATE_WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, ts: now });
    return true;
  }
  if (bucket.count >= RATE_MAX) return false;
  bucket.count += 1;
  return true;
};

const sanitize = (value, max = 2000) => {
  const clean = typeof value === "string" ? value.trim() : "";
  return clean.slice(0, max);
};

const logError = (msg, meta = {}) => {
  const safeMeta = {};
  const allowed = ["status", "stage", "reason", "ipHash", "error"];
  for (const key of allowed) {
    if (meta[key] !== undefined) safeMeta[key] = meta[key];
  }
  console.error(msg, safeMeta);
};

const hashIp = (ip) => {
  if (!ip) return undefined;
  try {
    return createHash("sha256").update(ip).digest("hex").slice(0, 16);
  } catch {
    return undefined;
  }
};

export async function POST(req) {
  if (!process.env.TURNSTILE_SECRET_KEY || !process.env.STATICFORMS_ACCESS_KEY) {
    logError("Missing TURNSTILE_SECRET_KEY or STATICFORMS_ACCESS_KEY", {
      stage: "config",
    });
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    logError("Invalid JSON", { stage: "parse" });
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    name,
    furigana,
    email,
    message,
    subject = "お問い合わせ",
    honeypot = "",
    turnstileToken,
  } = payload || {};

  const ip = getIp(req);
  const ipHash = hashIp(ip);

  if (honeypot) {
    logError("Honeypot triggered", { stage: "honeypot", ipHash });
    return NextResponse.json({ error: "Rejected" }, { status: 400 });
  }

  const safeName = sanitize(name, 100);
  const safeFurigana = sanitize(furigana, 100);
  const safeEmail = sanitize(email, 200);
  const safeMessage = sanitize(message, 5000);
  const safeSubject = sanitize(subject, 200);

  if (!safeName || !safeFurigana || !safeEmail || !safeMessage) {
    logError("Missing fields", { stage: "validate", ipHash });
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!emailRegex.test(safeEmail)) {
    logError("Invalid email", { stage: "validate", ipHash });
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!turnstileToken || typeof turnstileToken !== "string") {
    logError("Missing captcha", { stage: "validate", ipHash });
    return NextResponse.json({ error: "Missing captcha" }, { status: 400 });
  }
  if (!withinRateLimit(ip)) {
    logError("Rate limited", { stage: "rate-limit", ipHash });
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Verify Turnstile token
  const verifyParams = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: turnstileToken,
  });
  if (ip) verifyParams.set("remoteip", ip);

  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verifyParams,
    },
  );

  if (!verifyRes.ok) {
    logError("Turnstile verification failed", {
      stage: "captcha",
      status: verifyRes.status,
      ipHash,
    });
    return NextResponse.json({ error: "Captcha verification failed" }, { status: 502 });
  }

  const verifyJson = await verifyRes.json();
  if (!verifyJson.success) {
    logError("Captcha rejected", { stage: "captcha", ipHash });
    return NextResponse.json({ error: "Captcha rejected" }, { status: 400 });
  }

  // Relay to StaticForms with server-side accessKey
  const staticParams = new URLSearchParams({
    accessKey: process.env.STATICFORMS_ACCESS_KEY,
    name: safeName,
    furigana: safeFurigana,
    email: safeEmail,
    message: safeMessage,
    subject: safeSubject,
    replyTo: safeEmail,
  });
  if (ip) staticParams.set("ip", ip);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const staticRes = await fetch("https://api.staticforms.xyz/submit", {
      method: "POST",
      body: staticParams,
      signal: controller.signal,
    });

    if (!staticRes.ok) {
      const text = await staticRes.text().catch(() => "");
      logError("StaticForms error", {
        stage: "staticforms",
        status: staticRes.status,
        reason: text?.slice(0, 200),
        ipHash,
      });
      return NextResponse.json({ error: "Submit failed" }, { status: 502 });
    }
  } catch (err) {
    logError("StaticForms request failed", {
      stage: "staticforms",
      error: err?.message,
      ipHash,
    });
    return NextResponse.json({ error: "Submit failed" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }

  return NextResponse.json({ ok: true });
}
