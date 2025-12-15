"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function ContactSection({
  id = "contact",
  className = "",
  titleJp = "お問い合わせ",
  titleEn = "CONTACT",
  subject = "お問い合わせフォーム",
  submitIconActive = "/img/button-submit-black.svg",
  submitIconDisabled = "/img/button-submit-gold.svg",
}) {
  const formRef = useRef(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);
  const [formValid, setFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const validate = () => {
    const f = formRef.current;
    if (!f) return false;
    const name = f.name.value.trim();
    const furigana = f.furigana.value.trim();
    const email = f.email.value.trim();
    const message = f.message.value.trim();
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const ok = name && furigana && validEmail && message && turnstileToken;
    setFormValid(!!ok);
    return !!ok;
  };

  const handleBlurOrInput = () => validate();

  useEffect(() => {
    validate();
  }, [turnstileToken]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return;

    const render = () => {
      if (!window.turnstile || !turnstileRef.current) return;
      if (turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
        return;
      }
      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => setTurnstileToken(token || ""),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };

    if (window.turnstile) {
      render();
      return;
    }

    const onLoadName = "__turnstileOnLoad";
    window[onLoadName] = render;
    const script = document.createElement("script");
    script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=${onLoadName}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
      }
      delete window[onLoadName];
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      alert("すべての必須項目を正しく入力してください。メールアドレス形式にもご注意ください。");
      return;
    }

    setSubmitting(true);
    try {
      const f = formRef.current;
      const payload = {
        name: f.name.value.trim(),
        furigana: f.furigana.value.trim(),
        email: f.email.value.trim(),
        message: f.message.value.trim(),
        subject,
        honeypot: f.honeypot?.value || "",
        turnstileToken,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("送信が完了しました。ありがとうございます。");
        formRef.current.reset();
        setFormValid(false);
        setTurnstileToken("");
        if (turnstileWidgetId.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
      } else {
        alert("送信に失敗しました。再度お試しください。");
      }
    } catch (err) {
      alert("送信中にエラーが発生しました。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`contact section ${className}`} id={id}>
      <div className="cmn-container fade-in">
        <h2 className="title fade-in">
          <span className="title-jp">{titleJp}</span>
          <span className="title-en contact">{titleEn}</span>
        </h2>

        <p className="lead fade-in">
          お問い合わせは、下記のフォームより
          <br className="sp-only" />
          お願いいたします。
        </p>

        <form id="form" ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="honeypot" style={{ display: "none" }} />

          <div className="contact-field">
            <div className="contact-heading">
              <label className="contact-label contact-label-mobile">お名前</label>
              <span className="contact-span contact-span-mobile">必須</span>
            </div>
            <div className="contact-form">
              <input
                id="name"
                name="name"
                placeholder="入力してください"
                className="contact-textbox"
                onBlur={handleBlurOrInput}
                onInput={handleBlurOrInput}
              />
            </div>
          </div>

          <div className="contact-field">
            <div className="contact-heading">
              <label className="contact-label contact-label-mobile">フリガナ</label>
              <span className="contact-span contact-span-mobile">必須</span>
            </div>
            <div className="contact-form">
              <input
                id="furigana"
                name="furigana"
                placeholder="入力してください"
                className="contact-textbox"
                onBlur={handleBlurOrInput}
                onInput={handleBlurOrInput}
              />
            </div>
          </div>

          <div className="contact-field">
            <div className="contact-heading">
              <label className="contact-label">メールアドレス</label>
              <span className="contact-span">必須</span>
            </div>
            <div className="contact-form">
              <input
                id="email"
                name="email"
                placeholder="入力してください"
                className="contact-textbox"
                onBlur={handleBlurOrInput}
                onInput={handleBlurOrInput}
              />
            </div>
          </div>

          <div className="contact-field">
            <div className="contact-heading">
              <label className="contact-label">お問い合わせ内容</label>
              <span className="contact-span">必須</span>
            </div>
            <div className="contact-form">
              <textarea
                id="message"
                name="message"
                placeholder="入力してください"
                className="contact-textarea"
                onBlur={handleBlurOrInput}
                onInput={handleBlurOrInput}
              />
            </div>
          </div>

          <div className="contact-btn-wrap">
            <div
              ref={turnstileRef}
              className="contact-turnstile"
              aria-hidden="true"
            />
            <button
              type="submit"
              className={`contact-submit ${formValid ? "is-active" : ""}`}
              disabled={!formValid || submitting}
            >
              {submitting ? "送信中…" : "送信"}
              <Image
                src={formValid ? submitIconActive : submitIconDisabled}
                alt=""
                width={20}
                height={20}
                className="contact-submit-icon"
                aria-hidden="true"
                priority
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
