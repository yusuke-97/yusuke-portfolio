"use client";

import useFadeInScroll from "@/app/hooks/useFadeInScroll";
import WorkContents from "@/app/components/WorkContents";
import PageTopButton from "@/app/components/PageTopButton";
import WorkHero from "@/app/components/WorkHero";
import WorkMeta from "@/app/components/WorkMeta";
import WorksList from "@/app/components/WorksList";

export default function FoodieScoutPage() {
  useFadeInScroll();

  return (
    <main className="content">
      <article className="article">
        <div className="article-container">
          <h1 className="article-title fade-in">ポートフォリオサイト</h1>

          <div className="article-body">
            <WorkHero project="portfolio" />

            <WorkMeta project="portfolio" />

            <WorkContents project="portfolio" />
          </div>

          <WorksList filter="portfolio" />
        </div>
      </article>
      <PageTopButton />
    </main>
  );
}
