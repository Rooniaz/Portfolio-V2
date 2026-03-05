"use client";

import { useEffect, useState, useCallback } from "react";
import { navLinks } from "@/lib/data";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
  history.pushState(null, "", `#${id}`);
}

export default function Nav() {
  const [active, setActive] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const update = () => {
      const offset = 100;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  const handleClick = useCallback((href: string) => {
    const id = href.replace("#", "");
    scrollToSection(id);
    setMenuOpen(false);
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => handleClick("#home")}
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Portfolio
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((item, i) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <button
                  onClick={() => handleClick(item.href)}
                  className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? "font-semibold text-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  <span className="text-zinc-400 dark:text-zinc-600">
                    {String(i + 1).padStart(2, "0")}//&nbsp;
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Hamburger button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96 border-t border-zinc-200 dark:border-zinc-800" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-3">
          {navLinks.map((item, i) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <button
                  onClick={() => handleClick(item.href)}
                  className={`flex w-full items-center gap-2 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "font-semibold text-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  <span className="text-xs text-zinc-400 dark:text-zinc-600">
                    {String(i + 1).padStart(2, "0")}//
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
