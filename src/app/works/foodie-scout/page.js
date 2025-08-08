"use client";

import Image from "next/image";
import Link from "next/link";
import PageTopButton from "../../components/PageTopButton";
import useFadeInScroll from "../../hooks/useFadeInScroll";

const foodieScoutSections = [
  {
    id: "top-view",
    title: "トップ画面",
    img: "/img/works-detail/works-2-1.png",
    alt: "トップ画面",
    text:
      "トップ画面では、ユーザーが「料理ジャンル」や「おすすめ店舗」、「注目の店舗」から、飲食店を探すことができます。ユーザーの信頼性を示すバッジや人気ユーザー欄も表示されます。",
  },
  {
    id: "restaurant-detail",
    title: "飲食店詳細画面",
    img: "/img/works-detail/works-2-2.png",
    alt: "飲食店詳細画面",
    text:
      "飲食店の基本情報やネット予約機能、口コミなどを掲載し、ユーザーが予約に必要な情報を確認できる画面です。",
  },
  {
    id: "search-result",
    title: "検索結果画面",
    img: "/img/works-detail/works-2-3.png",
    alt: "検索結果画面",
    text:
      "検索条件に合った店舗を表示します。星評価を取り入れ、ユーザーが質の高い店舗を簡単に見つけられるようにしています。",
  },
  {
    id: "profile",
    title: "プロフィール画面",
    img: "/img/works-detail/works-2-4.png",
    alt: "プロフィール画面",
    text:
      "ユーザーが投稿した口コミやランキングを表示します。ジャンルごとの評価が見られ、他のユーザーが参考にできます。",
  },
  {
    id: "review",
    title: "レビュー画面",
    img: "/img/works-detail/works-2-5.png",
    alt: "レビュー作成画面",
    text:
      "料理ジャンルごとの口コミ投稿やランキングを作成できる機能を提供しています。",
  },
];

export default function FoodieScoutPage() {
  useFadeInScroll();

  return (
    <main className="content">
      <article className="article">
        <div className="article-container">
          <h2 className="article-title fade-in">飲食店予約サービスアプリ 【Foodie Scout】</h2>

          <div className="article-body">
            <div className="fade-in">
              <Image
                src="/img/works-detail/works-2-fv.png"
                alt="トップ画像"
                width={800}
                height={450}
              />
              <a
                href="https://foodie-scout-2c43510ee323.herokuapp.com"
                className="view-site"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Site
                <span
                  className="iconify"
                  data-icon="si:double-arrow-right-duotone"
                  data-inline="false"
                ></span>
              </a>
            </div>

            <div className="fade-in">
              <ul>
                <li>
                  <Image
                    src="/img/works-detail/github-icon.svg"
                    width={20}
                    height={20}
                    alt="GitHub"
                  />
                  <a
                    href="https://github.com/yusuke-97/ishistagram_app"
                    className="github-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/yusuke-97/ishistagram_app
                  </a>
                </li>
                <li>
                  <div className="arrow-box">Role</div>
                  <span className="text">基本設計、開発、テスト</span>
                </li>
                <li>
                  <div className="arrow-box">Tech</div>
                  <span className="text">
                    HTML / CSS / JavaScript / jQuery / PHP / Laravel / Amazon S3
                  </span>
                </li>
              </ul>
            </div>

            <div className="fade-in">
              <h3>サービスを開発したきっかけ</h3>
              <p>
                市場には数多くの飲食店予約サイトが存在しますが、真のグルメを満足させる飲食店の紹介に特化したサービスは不足していると感じました。このサービスは、グルメ愛好家が個性豊かな美食店を発掘できることを目的に開発しました。
              </p>
            </div>

            <div className="fade-in">
              <h3>概要</h3>
              <p>
                トップ画面、詳細画面、検索結果画面、プロフィール、レビュー作成など計17画面からなる飲食店予約サービスです。
              </p>
            </div>

            <ul className="overview-list">
              {foodieScoutSections.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    <Image
                      className="overview-list-img"
                      src="/img/works-detail/gear-icon.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    <span className="text">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>

            {foodieScoutSections.map((section) => (
              <div key={section.id} className="fade-in">
                <h3 id={section.id}>{section.title}</h3>
                <div className="views-detail">
                  <Image
                    src={section.img}
                    alt={section.alt}
                    width={800}
                    height={450}
                  />
                  <p className="detail">{section.text}</p>
                </div>
              </div>
            ))}

            <div className="fade-in">
              <h3>重視している点について</h3>
              <div className="views-detail">
                <Image
                  src="/img/works-detail/works-2-6.png"
                  alt="先払い予約システム説明"
                  width={800}
                  height={450}
                />
                <p className="detail">
                  予約時に予約料金（予算の50%）を先払いすることで無断キャンセルやフードロスの防止に貢献しています。残高不足の場合は確認ボタンを非活性にするなどのUXを考慮した実装も行いました。
                </p>
              </div>
            </div>

            <div className="fade-in">
              <h3>コーディングについて</h3>
              <p>
                Webアプリケーションとして、PC・スマホどちらでも快適に利用できるようレスポンシブデザインを採用しています。
              </p>
            </div>
          </div>

          <div className="home-link">
            <Link href="/#works" className="cp_link">
              <span data-text="Works一覧へ">Works一覧へ</span>
            </Link>
          </div>
        </div>
      </article>
      <PageTopButton />
    </main>
  );
}
