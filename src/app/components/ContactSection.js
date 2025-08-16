"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ContactSection({
  id = "contact",
  className = "",
  titleJp = "お問い合わせ",
  titleEn = "CONTACT",
  accessKey = "ec8beafa-d6d7-4e32-9d47-514c9f80258c",
  subject = "お問い合わせフォーム",
  submitIconActive = "/img/button-submit-black.svg",
  submitIconDisabled = "/img/button-submit-gold.svg",
}) {
  const formRef = useRef(null);
  const [formValid, setFormValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const f = formRef.current;
    if (!f) return false;
    const name = f.name.value.trim();
    const furigana = f.furigana.value.trim();
    const email = f.email.value.trim();
    const message = f.message.value.trim();
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const ok = name && furigana && validEmail && message;
    setFormValid(!!ok);
    return !!ok;
  };

  const handleBlurOrInput = () => validate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      alert("すべての必須項目を正しく入力してください。メールアドレス形式にもご注意ください。");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData(formRef.current);
      formData.set("accessKey", accessKey);
      formData.set("subject", subject);
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("送信が完了しました。ありがとうございます。");
        formRef.current.reset();
        setFormValid(false);
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
          <input type="hidden" name="accessKey" value={accessKey} />
          <input type="hidden" name="subject" value={subject} />
          <input type="hidden" name="replyTo" value="" />
          <input type="hidden" name="redirectTo" value="" />

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
            <button
              type="submit"
              className={`contact-submit ${formValid ? "is-active" : ""}`}
              disabled={!formValid || submitting}
            >
              {submitting ? "送信中…" : "送 信"}
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
