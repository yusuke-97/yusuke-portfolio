"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isTopPage = pathname === "/";

  const [scrolled, setScrolled] = useState(!isTopPage);

  useEffect(() => {
    if (!isTopPage) {
      setScrolled(true);
      return;
    }

    const onScrollOrResize = () => {
      const threshold = window.innerHeight;
      setScrolled(window.scrollY > threshold);
    };

    onScrollOrResize();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isTopPage, pathname]);

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
