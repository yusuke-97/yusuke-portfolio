import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header-logo">
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
    </header>
  );
}
