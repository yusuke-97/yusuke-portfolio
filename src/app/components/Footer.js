"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h1 className="footer-logo">
          <Link href="/">YUSUKE ISHIYAMA</Link>
        </h1>
        <nav className="gnav">
          <ul className="gnav-list">
            <li className="gnav-item">
              <Link href="/#works">WORKS</Link>
            </li>
            <li className="gnav-item">
              <Link href="/#skill">SKILL</Link>
            </li>
            <li className="gnav-item">
              <Link href="/#about">ABOUT</Link>
            </li>
            <li className="gnav-item">
              <Link href="/#contact">CONTACT</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="copyright">&copy;YUSUKE ISHIYAMA</div>
    </footer>
  );
}
