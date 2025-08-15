"use client";

import useFadeInScroll from "../../hooks/useFadeInScroll";
import WorkContents from "../../components/WorkContents";
import PageTopButton from "../../components/PageTopButton";
import WorkHero from "../../components/WorkHero";
import WorkMeta from "../../components/WorkMeta";
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
