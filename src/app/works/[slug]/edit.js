"use client";

import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import useFadeInScroll from "../../hooks/useFadeInScroll";

const worksData = {
  "ishistagram": {
    title: "ISHISTAGRAM",
    heading: "画像投稿型SNSアプリ【ISHISTAGRAM】",
    liveUrl: "https://ishistagram-914f42dea72b.herokuapp.com",
    github: "https://github.com/yusuke-97/ishistagram_app",
    role: "基本設計、開発、テスト",
    tech: "HTML / CSS / JavaScript / jQuery / PHP / Laravel / Amazon S3",
    images: ["works-1-fv.png", "works-1-1.png", "works-1-2.png"],
  },
  "foodie-scout": {
    title: "FOODIE SCOUT",
    heading: "飲食店予約サービスアプリ 【Foodie Scout】",
    liveUrl: "https://foodie-scout-2c43510ee323.herokuapp.com",
    github: "https://github.com/yusuke-97/ishistagram_app",
    role: "基本設計、開発、テスト",
    tech: "HTML / CSS / JavaScript / jQuery / PHP / Laravel / Amazon S3",
    images: [
      "works-2-fv.png",
      "works-2-1.png",
      "works-2-2.png",
      "works-2-3.png",
      "works-2-4.png",
      "works-2-5.png",
      "works-2-6.png"
    ],
  }
};

export default function WorkDetail() {
  const params = useParams(); // 👈 Next.jsのuseParamsで取得
  const work = worksData[params.slug];

  useFadeInScroll();

  if (!work) return notFound();

  return (
    <main className="content">
      <article className="article">
        <div className="article-container">
          <h2 className="article-title fade-in">{work.heading}</h2>
          <div className="article-body">
            <div className="fade-in">
              <Image
                src={`/img/works-detail/${work.images[0]}`}
                alt="トップ画像"
                width={800}
                height={400}
              />
              <a
                href={work.liveUrl}
                className="view-site"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Site
                <span className="iconify" data-icon="si:double-arrow-right-duotone" data-inline="false"></span>
              </a>
            </div>

            <div className="fade-in">
              <ul>
                <li>
                  <Image src="/img/works-detail/github-icon.svg" width={20} height={20} alt="GitHub" />
                  <a href={work.github} className="github-link" target="_blank" rel="noopener noreferrer">
                    {work.github}
                  </a>
                </li>
                <li>
                  <div className="arrow-box">Role</div>
                  <span className="text">{work.role}</span>
                </li>
                <li>
                  <div className="arrow-box">Tech</div>
                  <span className="text">{work.tech}</span>
                </li>
              </ul>
            </div>

            {work.images.slice(1).map((img, idx) => (
              <div className="views-detail fade-in" key={idx}>
                <Image
                  src={`/img/works-detail/${img}`}
                  alt={`詳細画像${idx + 1}`}
                  width={800}
                  height={450}
                />
                <p className="detail">
                  （ここに説明文を入れてください）
                </p>
              </div>
            ))}
          </div>

          <div className="home-link">
            <a href="/#works" className="cp_link">
              <span data-text="Works一覧へ">Works一覧へ</span>
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
