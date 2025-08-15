"use client";

import Image from "next/image";
import MV from "./components/MV";
import WorksGallery from "./components/WorksGallery";
import SkillSection from "./components/SkillSection";
import PageTopButton from "./components/PageTopButton";
import useFadeInScroll from "./hooks/useFadeInScroll";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  useFadeInScroll();
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { history, location } = window;
    const prev = history.scrollRestoration;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hasHash = location.hash && location.hash.length > 1;

    if (!hasHash) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }

    return () => {
      if (prev) history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      const id = href.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        e.preventDefault();
        const headerOffset = document.querySelector(".header")?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  const validateForm = () => {
    const form = formRef.current;
    const name = form.name.value.trim();
    const furigana = form.furigana.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const valid = name && furigana && email.includes("@") && email.includes(".") && message;
    setFormValid(valid);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("すべての必須項目を正しく入力してください。メールアドレス形式にもご注意ください。");
      return;
    }

    const form = formRef.current;
    const formData = new FormData(form);
    try {
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("送信が完了しました。ありがとうございます。");
        form.reset();
        setFormValid(false);
      } else {
        alert("送信に失敗しました。再度お試しください。");
      }
    } catch (error) {
      alert("送信中にエラーが発生しました。");
    }
  };

  const handleBlur = () => {
    validateForm();
  };

  return (
    <>
      <main className="content">
        <MV />

        <WorksGallery filter="top" />

        <SkillSection />

        <section className="about section" id="about">
          <div className="cmn-container fade-in">
            <h2 className="title fade-in">
              <span className="title-jp">私について</span>
              <span className="title-en">ABOUT</span>
            </h2>
            <div className="profile fade-in">
              <div className="profile-img">
                <Image src="/img/about.jpeg" alt="about" width={300} height={300} />
              </div>
              <div className="profile-body">
                <p className="profile-name">石山 優友</p>
                <p className="profile-detail">
                  東京都に在住しております。プログラミングに関して深く勉強したいという思いと、より具体的で実践的な内容を学びたいと思いからプログラミングスクールに入塾し、卒業後は現職でエンジニアとして働いております。Webアプリケーション開発におけるコーディングは得意分野で、エラーも問題なく対処・解決できることが強みです。学ぶことへの楽しさと同時に、日々の実務経験を通してスキルをさらに磨きたいと考えております。これからもエンジニアとしての道を精進し専門性を高めていくことで、プロジェクトに対して最大限の価値を提供したいと考えております。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="cmn-container fade-in">
            <h2 className="title fade-in">
              <span className="title-jp">お問い合わせ</span>
              <span className="title-en contact">CONTACT</span>
            </h2>
            <p className="lead fade-in">
              お問い合わせは、下記のフォームより
              <br className="sp-only" />
              お願いいたします。
            </p>
            <form id="form" ref={formRef} onSubmit={handleSubmit}>
              <input type="text" name="honeypot" style={{ display: "none" }} />
              <input type="hidden" name="accessKey" value="ec8beafa-d6d7-4e32-9d47-514c9f80258c" />
              <input type="hidden" name="subject" value="お問い合わせフォーム" />
              <input type="hidden" name="replyTo" value="" />
              <input type="hidden" name="redirectTo" value="" />

              <div className="contact-field">
                <div className="contact-heading">
                  <label className="contact-label contact-label-mobile">お名前</label>
                  <span className="contact-span contact-span-mobile">必須</span>
                </div>
                <div className="contact-form">
                  <input id="name" name="name" placeholder="入力してください" className="contact-textbox" onBlur={handleBlur} onInput={handleBlur} />
                </div>
              </div>

              <div className="contact-field">
                <div className="contact-heading">
                  <label className="contact-label contact-label-mobile">フリガナ</label>
                  <span className="contact-span contact-span-mobile">必須</span>
                </div>
                <div className="contact-form">
                  <input id="furigana" name="furigana" placeholder="入力してください" className="contact-textbox" onBlur={handleBlur} onInput={handleBlur} />
                </div>
              </div>

              <div className="contact-field">
                <div className="contact-heading">
                  <label className="contact-label">メールアドレス</label>
                  <span className="contact-span">必須</span>
                </div>
                <div className="contact-form">
                  <input id="email" name="email" placeholder="入力してください" className="contact-textbox" onBlur={handleBlur} onInput={handleBlur} />
                </div>
              </div>

              <div className="contact-field">
                <div className="contact-heading">
                  <label className="contact-label">お問い合わせ内容</label>
                  <span className="contact-span">必須</span>
                </div>
                <div className="contact-form">
                  <textarea id="message" name="message" placeholder="入力してください" className="contact-textarea" onBlur={handleBlur} onInput={handleBlur}></textarea>
                </div>
              </div>

              <div className="contact-btn-wrap">
                <button
                  type="submit"
                  className={`contact-submit ${formValid ? "is-active" : ""}`}
                  disabled={!formValid}
                >
                  送 信
                  <Image
                    src={formValid ? "/img/button-submit-black.svg" : "/img/button-submit-gold.svg"}
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

        <PageTopButton />
      </main>
    </>
  );
}
