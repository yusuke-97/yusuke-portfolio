"use client";

import Image from "next/image";
import MV from "./components/MV";
import SkillChart from "./components/SkillChart";
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
      } else {
        alert("送信に失敗しました。再度お試しください。");
      }
    } catch (error) {
      console.error(error);
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

        <section className="works section" id="works">
          <div className="cmn-container">
            <h2 className="title fade-in">
              <span className="title-jp">作品紹介</span>
              <span className="title-en">WORKS</span>
            </h2>
            <div className="works-list fade-in">
              <a className="works-item" href="/works/ishistagram">
                <div className="works-img">
                  <Image src="/img/works/ishistagram.png" alt="ishistagram" width={400} height={300} />
                </div>
                <p className="works-name">画像投稿型SNS【架空アプリ】</p>
              </a>
              <a className="works-item" href="/works/foodie-scout">
                <div className="works-img">
                  <Image src="/img/works/foodie-scout.png" alt="foodie-scout" width={400} height={300} />
                </div>
                <p className="works-name">飲食店予約サービス【架空アプリ】</p>
              </a>
            </div>
          </div>
        </section>

        <section className="skill section" id="skill">
          <div className="cmn-container fade-in">
            <h2 className="title fade-in">
              <span className="title-jp">できること</span>
              <span className="title-en">SKILL</span>
            </h2>
            <div className="skill-content fade-in">
              <div className="chart-container">
                <SkillChart />
              </div>
              <div className="skill-rating">
                <div className="skill-rating-item">
                  <h3>5. Expert</h3>
                  <p>専門知識を持ち、プロジェクト全体を主導し戦略的な設計やアーキテクチャの決定が可能。</p>
                </div>
                <div className="skill-rating-item">
                  <h3>4. Advanced</h3>
                  <p>応用的なスキルを持ち、チームメンバーをサポート・指導しながら高度な問題に対応可能。</p>
                </div>
                <div className="skill-rating-item">
                  <h3>3. Independent</h3>
                  <p>自立して標準的なタスクを遂行でき、中規模プロジェクトに貢献可能な段階。</p>
                </div>
                <div className="skill-rating-item">
                  <h3>2. Proficient</h3>
                  <p>実務で指導を受けながら作業でき、小規模なタスクを遂行できる段階。</p>
                </div>
                <div className="skill-rating-item">
                  <h3>1. Foundation</h3>
                  <p>基礎的な知識を持ち、個人学習や独学レベルで基本的な作業ができる状態。</p>
                </div>
              </div>
            </div>

            <div className="skill-list fade-in">
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/html-icon.svg" alt="html" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">HTML/CSS</h3>
                  <p className="skill-text">スマホで見ても表示崩れのないレスポンシブ対応も可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/js-icon.svg" alt="javascript" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">JavaScript</h3>
                  <p className="skill-text">お問い合わせフォームや自動スクロールなど動きのあるWebサイトを作ることが可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/jquery-icon.svg" alt="jquery" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">jQuery</h3>
                  <p className="skill-text">Webサイトにフェードイン・フェードアウトなどリッチな動きをつけることが可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/vuejs-icon.svg" alt="vue" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">Vue.js</h3>
                  <p className="skill-text">Vue.jsを用いて、Webアプリケーションに複雑な動きをつけることが可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img" style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image src="/img/skills/php-icon.svg" alt="php" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">PHP</h3>
                  <p className="skill-text">PHPを用いて、動きのあるWebアプリケーションを開発することが可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/laravel-icon.svg" alt="laravel" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">Laravel</h3>
                  <p className="skill-text">Laravelを用いて、小規模なMVCのWebアプリケーションを開発することが可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/cakephp-icon.svg" alt="cakephp" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">CakePHP</h3>
                  <p className="skill-text">CakePHPを用いて、MVCのWebアプリケーションの開発・保守が可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/codeigniter-icon.svg" alt="codeigniter" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">CodeIgniter</h3>
                  <p className="skill-text">CodeIgniterを用いて、MVCのWebアプリケーションの開発・保守が可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/docker-icon.svg" alt="docker" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">Docker</h3>
                  <p className="skill-text">コンテナ仮想化を用いてアプリケーションを開発・配置・実行することが可能です。</p>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-img">
                  <Image src="/img/skills/nextjs-icon.svg" alt="docker" width={60} height={60} />
                </div>
                <div className="skill-body">
                  <h3 className="skill-name">Next.js</h3>
                  <p className="skill-text">Next.jsを用いて、リッチな動きをつけたサイトを開発することができます。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="cmn-container fade-in">
            <h2 className="title fade-in">
              <span className="title-jp">私について</span>
              <span className="title-en">ABOUT</span>
            </h2>
            <div className="profile fade-in">
              <div className="profile-img">
                <Image src="/img/about.jpeg" alt="about" width={400} height={300} />
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
