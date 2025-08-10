"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 画面の高さ 100vh を基準に変更
      setScrolled(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="inner">
        <h1 className="header-logo">
          <Link href="/">YUSUKE ISHIYAMA</Link>
        </h1>
        <nav className="gnav">
          <ul className="gnav-list">
            <li className="gnav-item"><Link href="/#works">WORKS</Link></li>
            <li className="gnav-item"><Link href="/#skill">SKILL</Link></li>
            <li className="gnav-item"><Link href="/#about">ABOUT</Link></li>
            <li className="gnav-item"><Link href="/#contact">CONTACT</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
