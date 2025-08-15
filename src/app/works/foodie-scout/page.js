"use client";

import useFadeInScroll from "../../hooks/useFadeInScroll";
import WorkContents from "../../components/WorkContents";
import PageTopButton from "../../components/PageTopButton";
import WorkHero from "../../components/WorkHero";
import WorkMeta from "../../components/WorkMeta";
import WorksGallery from "@/app/components/WorksGallery";

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

          <WorksGallery
            filter="foodieScout"
            titleJp="他の作品"
            titleEn="OTHER WORKS"
          />
        </div>
      </article>
      <PageTopButton />
    </main>
  );
}
