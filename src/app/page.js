"use client";

import MV from "./components/MV";
import WorksList from "./components/WorksList";
import SkillSection from "./components/SkillSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import PageTopButton from "./components/PageTopButton";
import useFadeInScroll from "./hooks/useFadeInScroll";
import { useEffect } from "react";

export default function Home() {
  useFadeInScroll();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { history, location } = window;
    const prev = history.scrollRestoration;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hasHash = location.hash && location.hash.length > 1;

    if (!hasHash) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }

    return () => {
      if (prev) history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      const id = href.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        e.preventDefault();
        const headerOffset = document.querySelector(".header")?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <>
      <main className="content">
        <MV />

        <WorksList filter="top" />

        <SkillSection />

        <AboutSection />

        <ContactSection />

        <PageTopButton />
      </main>
    </>
  );
}
