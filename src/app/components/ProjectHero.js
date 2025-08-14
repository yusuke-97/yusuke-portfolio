"use client";
import Image from "next/image";
import { PROJECTS_META } from "@/app/data/projects";

const VISIT_LABEL = "Visit Site";
const HERO_WIDTH = 1908;
const HERO_HEIGHT = 1168;

export default function ProjectHero({ project, className = "", overrides = {} }) {
  const base = PROJECTS_META[project] || {};
  const meta = { ...base, ...overrides };
  const { siteUrl, heroSrc, heroAlt } = meta;

  if (!heroSrc) return null;

  return (
    <div className={`project-hero fade-in ${className}`} data-project={project}>
      <Image
        src={heroSrc}
        alt={heroAlt || `${project} トップ画像`}
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        priority
      />

      {siteUrl && (
        <a
          href={siteUrl}
          className="visit-site"
          target="_blank"
          rel="noopener noreferrer"
        >
          {VISIT_LABEL}
          <Image
            src="/img/works-detail/new-tab-icon.svg"
            alt=""
            width={24}
            height={24}
            className="visit-site-icon"
            aria-hidden="true"
            priority
          />
        </a>
      )}
    </div>
  );
}
