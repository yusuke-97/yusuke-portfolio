"use client";

import Image from "next/image";
import Link from "next/link";
import { WORKS_META } from "@/app/data/works";

export default function WorksGallery({
  filter = "top",
  id = "works",
  className = "",
  titleJp = "作品紹介",
  titleEn = "WORKS",
}) {
  const isTop = filter === "top";

  let entries = Object.entries(WORKS_META).sort(
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
          <span className="title-jp">{titleJp}</span>
          <span className="title-en">{titleEn}</span>
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

