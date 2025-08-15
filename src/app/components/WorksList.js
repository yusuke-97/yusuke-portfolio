"use client";

import Image from "next/image";
import Link from "next/link";
import { WORKS_LIST } from "@/app/data/worksList";

export default function WorksGallery({
  filter = "top",
  id = "works",
  className = "",
  titleJp,
  titleEn,
}) {
  const isTop = filter === "top";

  const autoTitleJp = isTop ? "作品紹介" : "他の作品";
  const autoTitleEn = isTop ? "WORKS" : "OTHER WORKS";
  const headingJp = titleJp ?? autoTitleJp;
  const headingEn = titleEn ?? autoTitleEn;

  let entries = Object.entries(WORKS_LIST).sort(
    (a, b) => (a[1].order ?? 999) - (b[1].order ?? 999)
  );
  if (!isTop) entries = entries.filter(([key]) => key !== filter);

  return (
    <section
      className={`works section ${isTop ? "is-top" : "is-sub"} ${className}`}
      id={id}
    >
      <div className="cmn-container">
        <h2 className="title fade-in">
          <span className="title-jp">{headingJp}</span>
          <span className="title-en">{headingEn}</span>
        </h2>

        <div className="works-list fade-in">
          {entries.map(([key, w]) => (
            <Link className="works-item" key={key} href={w.href}>
              <div className="works-img-wrap">
                <Image className="works-img" src={w.img} alt={w.alt} width={828} height={621} />
              </div>
              <div className="works-info">
                <div className="works-meta">
                  <span className="badge">{w.badge}</span>
                  <time className="date">{w.date}</time>
                </div>
                <p className="works-title">{w.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
