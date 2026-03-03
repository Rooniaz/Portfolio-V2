"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";

export default function Nav() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));

    const update = () => {
      const offset = 100; // navbar height + buffer
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="#home"
          className="text-sm font-medium text-zinc-600 transition-colors duration-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Portfolio
        </Link>
        <ul className="flex gap-6">
          {navLinks.map((item, i) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
