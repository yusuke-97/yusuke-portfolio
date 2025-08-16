"use client";

import React, { use as usePromise } from "react";
import { notFound } from "next/navigation";
import useFadeInScroll from "@/app/hooks/useFadeInScroll";
import WorkContents from "@/app/components/WorkContents";
import PageTopButton from "@/app/components/PageTopButton";
import WorkHero from "@/app/components/WorkHero";
import WorkMeta from "@/app/components/WorkMeta";
import WorksList from "@/app/components/WorksList";
import { WORKS_META } from "@/app/data/worksMeta";

const slugToProject = (slug) => slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

export default function WorkPage({ params }) {
  useFadeInScroll();

  const { slug } = usePromise(params);
  const project = slugToProject(slug);
  const meta = WORKS_META[project];

  if (!meta) return notFound();

  const h1 = meta.pageTitle ?? meta.heroAlt ?? project;

  return (
    <main className="content">
      <article className="article">
        <div className="article-container">
          <h1 className="article-title fade-in">{h1}</h1>

          <div className="article-body">
            <WorkHero project={project} />
            <WorkMeta project={project} />
            <WorkContents project={project} />
          </div>

          <WorksList filter={project} />
        </div>
      </article>
      <PageTopButton />
    </main>
  );
}
