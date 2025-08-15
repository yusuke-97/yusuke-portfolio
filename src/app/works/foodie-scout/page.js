"use client";

import Image from "next/image";
import Link from "next/link";
import useFadeInScroll from "../../hooks/useFadeInScroll";
import WorkSections from "../../components/WorkSections";
import PageTopButton from "../../components/PageTopButton";
import ProjectHero from "../../components/ProjectHero";
import ProjectMeta from "../../components/ProjectMeta";

export default function FoodieScoutPage() {
  useFadeInScroll();

  return (
    <main className="content">
      <article className="article">
        <div className="article-container">
          <h1 className="article-title fade-in">飲食店予約サービスアプリ 【Foodie Scout】</h1>

          <div className="article-body">
            <ProjectHero project="foodieScout" />

            <ProjectMeta project="foodieScout" />

            <div className="article-part fade-in">
              <h2>概要</h2>
              <p>
                トップ画面、詳細画面、検索結果画面、プロフィール、レビュー作成など計17画面からなる飲食店予約サービスです。
              </p>
            </div>
            
            <WorkSections project="foodieScout" />

            <div className="article-part fade-in">
              <h2>重視している点について</h2>
              <div className="views-detail">
                <Image
                  src="/img/works-detail/works-2-6.png"
                  alt="先払い予約システム説明"
                  width={800}
                  height={450}
                />
                <p className="detail">
                  予約時に予約料金（予算の50%）を先払いすることで無断キャンセルやフードロスの防止に貢献しています。残高不足の場合は確認ボタンを非活性にするなどのUXを考慮した実装も行いました。
                </p>
              </div>
            </div>
            <div className="article-part fade-in">
              <h2>コーディングについて</h2>
              <p>
                Webアプリケーションとして、PC・スマホどちらでも快適に利用できるようレスポンシブデザインを採用しています。
              </p>
            </div>
          </div>

          <div className="home-link">
            <Link href="/#works" className="cp_link">
              <span data-text="Works一覧へ">Works一覧へ</span>
            </Link>
          </div>
        </div>
      </article>
      <PageTopButton />
    </main>
  );
}
