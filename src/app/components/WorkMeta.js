"use client";
import Image from "next/image";
import { PROJECTS_META } from "@/app/data/projects";

export default function WorkMeta({ project, overrides = {}, className = "" }) {
  const base = PROJECTS_META[project] || {};
  const meta = { ...base, ...overrides };
  const { githubUrl, role, tech } = meta;

  if (!role && !tech && !githubUrl) return null;

  return (
    <div className="fade-in">
      <ul className={`overview-list ${className}`} data-project={project}>
        {githubUrl && (
          <li className="overview-item overview-item--github">
            <Image
              src="/img/works-detail/github-icon.svg"
              width={39}
              height={39}
              alt={`${project} GitHub`}
            />
            <a
              href={githubUrl}
              className="github-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project} のGitHubリポジトリを開く`}
            >
              {githubUrl}
            </a>
          </li>
        )}

        {role && (
          <li className="overview-item">
            <div className="arrow-box"><span className="arrow-box__label">Role</span></div>
            <span className="text">{role}</span>
          </li>
        )}

        {tech && (
          <li className="overview-item">
            <div className="arrow-box"><span className="arrow-box__label">Tech</span></div>
            <span className="text">{tech}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
