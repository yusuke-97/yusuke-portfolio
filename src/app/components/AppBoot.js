"use client";
import { useEffect } from "react";

export default function AppBoot() {
  useEffect(() => {
    const shown = (() => {
      try { return sessionStorage.getItem("loaderShown") === "1"; } catch { return false; }
    })();

    document.body.classList.add("hydrated");

    if (!shown) document.body.classList.add("lock--loader");

    document.body.classList.remove("app-booting");

    const onDone = () => document.body.classList.remove("lock--loader");
    document.addEventListener("loader:done", onDone);
    return () => document.removeEventListener("loader:done", onDone);
  }, []);

  return null;
}
