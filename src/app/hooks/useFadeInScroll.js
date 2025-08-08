import { useEffect, useState } from "react";

export default function useFadeInScroll() {
  const [showPageTop, setShowPageTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowPageTop(window.scrollY > 300);
      document.querySelectorAll(".fade-in").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 50) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);
    // handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleScroll);
    };
  }, []);
}
