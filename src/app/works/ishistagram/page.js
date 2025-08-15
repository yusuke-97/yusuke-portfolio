"use client";

import Image from "next/image";
import Link from "next/link";
import useFadeInScroll from "../../hooks/useFadeInScroll";
import WorkSections from "../../components/WorkSections";
import PageTopButton from "../../components/PageTopButton";
import ProjectHero from "../../components/ProjectHero";
import ProjectMeta from "../../components/ProjectMeta";

export default function IshistagramPage() {
  useFadeInScroll();

  return (
    <main className="content">
      <article className="article">
        <div className="article-container">
          <h1 className="article-title fade-in">画像投稿型SNSアプリ【ISHISTAGRAM】</h1>

          <div className="article-body">
            <ProjectHero project="ishistagram" />

            <ProjectMeta project="ishistagram" />

            <div className="article-part fade-in">
              <h2>概要</h2>
              <p>
                プロフィール画面と新規投稿画面、投稿編集画面、検索結果画面、プロフィール編集画面の6画面から構成される画像投稿型SNSのWebアプリケーションです。
              </p>
            </div>
            
            <WorkSections project="ishistagram" />

            <div className="article-part fade-in">
              <h2>重視している点について</h2>
              <div className="views-detail">
                <Image
                  src="/img/works-detail/works-1-7.png"
                  width={1908}
                  height={1810}
                  alt="ラベル機能の説明画像"
                />
                <p className="detail">
                  既存のSNSであるInstagramを参考に、フォルダー管理のように投稿をラベルで分類できる機能を追加。
                </p>
              </div>
            </div>
            <div className="article-part fade-in">
              <h2>コーディングについて</h2>
              <p>
                Webアプリケーションを開発する上で、PCはもちろんのこと、スマートフォンでも見やすくするためレスポンシブ対応を施しております。
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
