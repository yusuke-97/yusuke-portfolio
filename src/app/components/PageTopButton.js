"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function PageTopButton() {
  useEffect(() => {
    const pageTop = document.getElementById("js-page-top");

    const handleScroll = () => {
      if (!pageTop) return;

      const scrollY = window.scrollY;
      const showPosition = 300;

      // 表示・非表示制御
      if (scrollY > showPosition) {
        pageTop.classList.add("show");
      } else {
        pageTop.classList.remove("show");
      }

      // フッターとの重なりをチェック
      const footer = document.querySelector(".footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top + window.pageYOffset;
        const scrollBottom = scrollY + window.innerHeight;

        if (scrollBottom > footerTop) {
          pageTop.classList.add("is-footer");
        } else {
          pageTop.classList.remove("is-footer");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初回実行

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-top" id="js-page-top" onClick={scrollToTop}>
      <Image src="/img/page-top-icon.svg" alt="ページトップ" className="page-top-icon" width={40} height={40} />
    </div>
  );
}
