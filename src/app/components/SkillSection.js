"use client";

import Image from "next/image";
import SkillChart from "./SkillChart";

const NUMBER_IMG = {
  "1": "/img/levels/1.svg",
  "2": "/img/levels/2.svg",
  "3": "/img/levels/3.svg",
  "4": "/img/levels/4.svg",
  "5": "/img/levels/5.svg",
};

function NumberImage({ value, size = 28 }) {
  const src = NUMBER_IMG[value] || NUMBER_IMG["1"];
  return (
    <Image
      src={src}
      alt={`Level ${value}`}
      width={size}
      height={size}
      priority
      style={{ display: "inline-block" }}
    />
  );
}

export default function SkillSection() {
  return (
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
            {[
              { num: "5", text: "Expert", desc: "専門知識を持ち、プロジェクト全体を主導できる状態" },
              { num: "4", text: "Advanced", desc: "応用的なスキルを持ち、高度な問題に対応できる段階" },
              { num: "3", text: "Independent", desc: "実務レベルで自立して標準的なタスクを遂行できる段階" },
              { num: "2", text: "Proficient", desc: "実務レベルで指導を受けながら作業できる状態" },
              { num: "1", text: "Foundation", desc: "個人学習や独学レベルで基礎的な知識を持つ程度" },
            ].map((item) => (
              <div className="skill-rating-item" key={item.num}>
                <h3 className="skill-rating-heading">
                  <div className="skill-rating-number">
                    <NumberImage value={item.num} />
                  </div>
                  <span>{item.text}</span>
                </h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="skill-list fade-in">
          {[
            { src: "/img/skills/html-icon.svg", alt: "html", name: "HTML/CSS", text: "スマホで見ても表示崩れのないレスポンシブ対応も可能です。" },
            { src: "/img/skills/js-icon.svg", alt: "javascript", name: "JavaScript", text: "お問い合わせフォームや自動スクロールなど動きのあるWebサイトを作ることが可能です。" },
            { src: "/img/skills/jquery-icon.svg", alt: "jquery", name: "jQuery", text: "Webサイトにフェードイン・フェードアウトなどリッチな動きをつけることが可能です。" },
            { src: "/img/skills/vuejs-icon.svg", alt: "vue", name: "Vue.js", text: "Vue.jsを用いて、Webアプリケーションに複雑な動きをつけることが可能です。" },
            { src: "/img/skills/php-icon.svg", alt: "php", name: "PHP", text: "PHPを用いて、動きのあるWebアプリケーションを開発することが可能です。" },
            { src: "/img/skills/laravel-icon.svg", alt: "laravel", name: "Laravel", text: "Laravelを用いて、小規模なMVCのWebアプリケーションを開発することが可能です。" },
            { src: "/img/skills/cakephp-icon.svg", alt: "cakephp", name: "CakePHP", text: "CakePHPを用いて、MVCのWebアプリケーションの開発・保守が可能です。" },
            { src: "/img/skills/codeigniter-icon.svg", alt: "codeigniter", name: "CodeIgniter", text: "CodeIgniterを用いて、MVCのWebアプリケーションの開発・保守が可能です。" },
            { src: "/img/skills/docker-icon.svg", alt: "docker", name: "Docker", text: "コンテナ仮想化を用いてアプリケーションを開発・配置・実行することが可能です。" },
            { src: "/img/skills/nextjs-icon.svg", alt: "nextjs", name: "Next.js", text: "Next.jsを用いて、リッチな動きをつけたサイトを開発することができます。" },
          ].map((skill) => (
            <div className="skill-item" key={skill.name}>
              <div className="skill-img" style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src={skill.src} alt={skill.alt} width={60} height={60} />
              </div>
              <div className="skill-body">
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-text">{skill.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
