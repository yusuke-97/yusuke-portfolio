import { useEffect, useRef, useState } from "react";

export default function useFadeInScroll() {
  const [showPageTop, setShowPageTop] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      setShowPageTop(window.scrollY > 300);

      const els = document.querySelectorAll(".fade-in");
      const winH = window.innerHeight || document.documentElement.clientHeight;

      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < winH - 50) {
          el.classList.add("active");
        }
      });
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScrollOrResize);
    window.addEventListener("resize", onScrollOrResize);

    requestAnimationFrame(check);

    window.addEventListener("load", check);

    const onLoaderDone = () => requestAnimationFrame(check);
    document.addEventListener("loader:done", onLoaderDone);

    try {
      if (sessionStorage.getItem("loaderShown") === "1") {
        requestAnimationFrame(check);
      }
    } catch {}

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("load", check);
      document.removeEventListener("loader:done", onLoaderDone);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { showPageTop };
}
