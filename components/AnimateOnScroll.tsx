"use client";

import { useRef, useState, useEffect } from "react";

export type AnimateFrom = "up" | "down" | "left" | "right" | "scale" | "fade";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  from?: AnimateFrom;
  duration?: number;
}

const hiddenClass: Record<AnimateFrom, string> = {
  up: "translate-y-8 opacity-0",
  down: "-translate-y-8 opacity-0",
  left: "-translate-x-8 opacity-0",
  right: "translate-x-8 opacity-0",
  scale: "scale-90 opacity-0",
  fade: "opacity-0",
};

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  from = "up",
  duration = 700,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setInView(true), delay);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`${
        inView
          ? "translate-y-0 translate-x-0 scale-100 opacity-100"
          : hiddenClass[from]
      } ${className}`}
      style={{
        transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1), opacity ${duration}ms ease-out`,
        transitionDelay: `0ms`,
      }}
    >
      {children}
    </div>
  );
}
