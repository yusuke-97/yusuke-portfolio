"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// アイコンは用意済みのSVGを指定
const NAV = [
  { href: "/#works",   label: "WORKS",   icon: "/img/nav/works-icon.svg" },
  { href: "/#skill",   label: "SKILL",   icon: "/img/nav/skill-icon.svg" },
  { href: "/#about",   label: "ABOUT",   icon: "/img/nav/about-icon.svg" },
  { href: "/#contact", label: "CONTACT", icon: "/img/nav/contact-icon.svg"  },
];

export default function Header() {
  const pathname = usePathname();
  const isTopPage = pathname === "/";

  const [scrolled, setScrolled] = useState(!isTopPage);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isTopPage) { setScrolled(true); return; }
    const onScrollOrResize = () => setScrolled(window.scrollY > window.innerHeight);
    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isTopPage]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="inner">
        <h1 className="header-logo">
          <Link href="/">YUSUKE ISHIYAMA</Link>
        </h1>

        {/* PCナビはそのまま */}
        <nav className="gnav pc-only">
          <ul className="gnav-list">
            {NAV.map((n) => (
              <li key={n.href} className="gnav-item">
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* SPハンバーガー */}
        <button
          type="button"
          className={`hamburger sp-only ${open ? "is-open" : ""}`}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="sp-menu"
          onClick={() => setOpen(v => !v)}
        >
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
          <span className="hamburger__label">{open ? "CLOSE" : "MENU"}</span>
        </button>
      </div>

      {/* SPドロワー */}
      <div id="sp-menu" className={`sp-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="sp-menu__panel" role="navigation">
          <ul className="sp-menu__list">
            {NAV.map((n) => (
              <li key={n.href} className="sp-menu__item">
                <Link href={n.href} onClick={() => setOpen(false)} className="sp-menu__link">
                  <span className="sp-menu__icon">
                    <Image
                      src={n.icon}
                      width={20}
                      height={20}
                      alt=""
                      aria-hidden="true"
                      className="sp-menu__iconImg"
                      priority
                    />
                  </span>
                  <span className="sp-menu__text">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
