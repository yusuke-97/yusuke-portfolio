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
          <h1 className="article-title fade-in">ポートフォリオサイト</h1>

          <div className="article-body">
            <ProjectHero project="portfolio" />

            <ProjectMeta project="portfolio" />

            <div className="article-part fade-in">
              <h2>概要</h2>
              <p>
                トップページと作品紹介ページの２ページから構成されるポートフォリオサイトです。
              </p>
            </div>
            
            <WorkSections project="portfolio" />

            <div className="article-part fade-in">
              <h2>重視している点について</h2>
              <div className="views-detail">
                <Image
                  src="/img/works-detail/works-3-3.png"
                  alt="先払い予約システム説明"
                  width={800}
                  height={450}
                />
                <p className="detail">
                  作品紹介ページやTOPページのSKILLなど、視覚的に見やすいようにしました。
                </p>
              </div>
            </div>
            <div className="article-part fade-in">
              <h2>コーディングについて</h2>
              <p>
                PC・スマホどちらでも快適に利用できるようレスポンシブデザインを採用しています。
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
