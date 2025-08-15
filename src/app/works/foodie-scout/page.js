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
          <h1 className="article-title fade-in">飲食店予約サービスアプリ 【Foodie Scout】</h1>

          <div className="article-body">
            <WorkHero project="foodieScout" />

            <WorkMeta project="foodieScout" />
            
            <WorkContents project="foodieScout" />
          </div>

          <WorksList filter="foodieScout" />
        </div>
      </article>
      <PageTopButton />
    </main>
  );
}
