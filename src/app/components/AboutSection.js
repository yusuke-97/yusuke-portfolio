import Image from "next/image";

export default function AboutSection({
  id = "about",
  className = "",
  titleJp = "私について",
  titleEn = "ABOUT",

  imageSrc = "/img/about.jpeg",
  imageAlt = "about",
  imageWidth = 300,
  imageHeight = 300,

  name = "石山 優友",
  paragraphs = [
    "東京都に在住しております。プログラミングに関して深く勉強したいという思いと、より具体的で実践的な内容を学びたいと思いからプログラミングスクールに入塾し、卒業後は現職でエンジニアとして働いております。\nWebアプリケーション開発におけるコーディングは得意分野で、エラーも問題なく対処・解決できることが強みです。学ぶことへの楽しさと同時に、日々の実務経験を通してスキルをさらに磨きたいと考えております。\nこれからもエンジニアとしての道を精進し専門性を高めていくことで、プロジェクトに対して最大限の価値を提供したいと考えております。",
  ],
}) {
  return (
    <section className={`about section ${className}`} id={id}>
      <div className="cmn-container fade-in">
        <h2 className="title fade-in">
          <span className="title-jp">{titleJp}</span>
          <span className="title-en">{titleEn}</span>
        </h2>

        <div className="profile fade-in">
          <div className="profile-img">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
            />
          </div>

          <div className="profile-body">
            <p className="profile-name">{name}</p>
            {paragraphs.map((t, i) => (
              <p key={i} className="profile-detail">{t}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
