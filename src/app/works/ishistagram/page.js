"use client";

import useFadeInScroll from "../../hooks/useFadeInScroll";
import WorkContents from "../../components/WorkContents";
import PageTopButton from "../../components/PageTopButton";
import WorkHero from "../../components/WorkHero";
import WorkMeta from "../../components/WorkMeta";
import WorksList from "@/app/components/WorksList";

export default function IshistagramPage() {
  useFadeInScroll();

  return (
    <main className="content">
      <article className="article">
        <div className="article-container">
          <h1 className="article-title fade-in">画像投稿型SNSアプリ【ISHISTAGRAM】</h1>

          <div className="article-body">
            <WorkHero project="ishistagram" />

            <WorkMeta project="ishistagram" />
            
            <WorkContents project="ishistagram" />
          </div>

          <WorksList filter="ishistagram" />
        </div>
      </article>
      <PageTopButton />
    </main>
  );
}
