"use client";

import Image from "next/image";
import Link from "next/link";
import useFadeInScroll from "../../hooks/useFadeInScroll";
import WorkSections from "../../components/WorkSections";
import PageTopButton from "../../components/PageTopButton";

const ishistagramSections = [
  {
    id: "profile",
    title: "プロフィール画面",
    img: "/img/works-detail/works-1-1.png",
    alt: "プロフィール画面",
    text: "ユーザーのプロフィール画面では、過去に投稿したことがあるものが表示されます。また、他のユーザーをフォローしたり、自分のプロフィールを編集することもできます。さらに、ラベル選択によりラベルのついた投稿のみを表示させることもできます。",
  },
  {
    id: "new-post",
    title: "新規投稿画面",
    img: "/img/works-detail/works-1-2.png",
    alt: "新規投稿画面",
    text: "画像と投稿文、ラベルをつけて投稿することができます。ラベルをつけることによって、プロフィール画面で、投稿の管理がしやすくなります。ラベルは最大2個まで設定することができます。",
  },
  {
    id: "edit-post",
    title: "投稿編集画面",
    img: "/img/works-detail/works-1-3.png",
    alt: "投稿編集画面",
    text: "過去の投稿を編集することができます。例えば、ラベルの変更や追加によってプロフィール画面で管理しやすくなります。",
  },
  {
    id: "search-result",
    title: "検索結果画面",
    img: "/img/works-detail/works-1-5.png",
    alt: "検索結果画面",
    text: "検索結果画面では、ハッシュタグやラベルで関連する他のユーザーの投稿を検索することができます。これにより、ユーザーが興味のある投稿のみを見つけることができます。",
  },
  {
    id: "edit-profile",
    title: "プロフィール編集画面",
    img: "/img/works-detail/works-1-6.png",
    alt: "プロフィール編集画面",
    text: "プロフィール編集画面では、プロフィール画像や名前、自己紹介など、ユーザーの基本情報を編集することができます。",
  },
];

export default function IshistagramPage() {
  useFadeInScroll();

  return (
    <main className="content">
      <article className="article">
        <div className="article-container">
          <h2 className="article-title fade-in">画像投稿型SNSアプリ【ISHISTAGRAM】</h2>

          <div className="article-body">
            <div className="fade-in">
              <Image
                src="/img/works-detail/works-1-fv.png"
                alt="ISHISTAGRAM トップ画像"
                width={800}
                height={450}
              />
              <a
                href="https://ishistagram-914f42dea72b.herokuapp.com"
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
                  <span className="text">HTML / CSS / JavaScript / jQuery / PHP / Laravel / Amazon S3</span>
                </li>
              </ul>
            </div>

            <div className="fade-in">
              <h3>概要</h3>
              <p>
                プロフィール画面と新規投稿画面、投稿編集画面、検索結果画面、プロフィール編集画面の6画面から構成される画像投稿型SNSのWebアプリケーションです。
              </p>
            </div>
            <ul className="overview-list">
              {ishistagramSections.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    <Image className="overview-list-img" src="/img/works-detail/gear-icon.svg" width={20} height={20} alt="" />
                    <span className="text">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>

            <WorkSections sections={ishistagramSections} />

            <div className="fade-in">
              <h3>重視している点について</h3>
              <div className="views-detail">
                <Image
                  src="/img/works-detail/works-1-7.png"
                  width={800}
                  height={450}
                  alt="ラベル機能の説明画像"
                />
                <p className="detail">
                  既存のSNSであるInstagramを参考に、フォルダー管理のように投稿をラベルで分類できる機能を追加。
                </p>
              </div>
            </div>
            <div className="fade-in">
                <h3>コーディングについて</h3>
                <p>
                  Webアプリケーションを開発する上で、PCはもちろんのこと、スマートフォンでも見やすくするためレスポンシブ対応を施しております。
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
