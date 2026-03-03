"use client";

import { useState, useEffect, useRef } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const iconMap: Record<string, string> = {
  HTML: `${CDN}/html5/html5-original.svg`,
  CSS: `${CDN}/css3/css3-original.svg`,
  JavaScript: `${CDN}/javascript/javascript-original.svg`,
  Angular: `${CDN}/angularjs/angularjs-original.svg`,
  TypeScript: `${CDN}/typescript/typescript-original.svg`,
  WordPress: `${CDN}/wordpress/wordpress-original.svg`,
  Bootstrap: `${CDN}/bootstrap/bootstrap-original.svg`,
  "Node.js": `${CDN}/nodejs/nodejs-original.svg`,
  PostgreSQL: `${CDN}/postgresql/postgresql-original.svg`,
  SQL: `${CDN}/mysql/mysql-original.svg`,
  Java: `${CDN}/java/java-original.svg`,
  "Spring Boot": `${CDN}/spring/spring-original.svg`,
  Flask: `${CDN}/flask/flask-original.svg`,
};

const rings = [
  {
    radius: 138,
    durationSec: 22,
    clockwise: true,
    skills: ["TypeScript", "Spring Boot", "Node.js"],
    size: "lg" as const,
  },
  {
    radius: 238,
    durationSec: 34,
    clockwise: false,
    skills: ["HTML", "CSS", "JavaScript", "Angular", "PostgreSQL"],
    size: "md" as const,
  },
  {
    radius: 330,
    durationSec: 48,
    clockwise: true,
    skills: ["Bootstrap", "WordPress", "Java", "SQL", "Flask", "Playwright"],
    size: "sm" as const,
  },
];

const sizeStyles = {
  lg: { pill: "px-4 py-2.5 gap-2.5 text-sm", box: "h-9 w-9 rounded-xl", icon: "h-5 w-5" },
  md: { pill: "px-3.5 py-2 gap-2 text-xs", box: "h-7 w-7 rounded-lg", icon: "h-4 w-4" },
  sm: { pill: "px-3 py-1.5 gap-1.5 text-xs", box: "h-6 w-6 rounded-md", icon: "h-3.5 w-3.5" },
};

function SkillPill({ name, size }: { name: string; size: "lg" | "md" | "sm" }) {
  const iconUrl = iconMap[name] ?? null;
  const [iconError, setIconError] = useState(false);
  const showIcon = iconUrl && !iconError;
  const s = sizeStyles[size];

  return (
    <div
      className={`inline-flex items-center whitespace-nowrap select-none rounded-full border border-zinc-700/80 bg-zinc-900/95 font-medium text-zinc-100 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${s.pill}`}
    >
      {showIcon ? (
        <span className={`flex flex-shrink-0 items-center justify-center bg-zinc-800 ${s.box}`}>
          <img
            src={iconUrl}
            alt=""
            className={`${s.icon} opacity-90`}
            onError={() => setIconError(true)}
          />
        </span>
      ) : (
        <span className={`flex flex-shrink-0 items-center justify-center bg-zinc-700 text-xs font-bold text-zinc-300 ${s.box}`}>
          {name[0]}
        </span>
      )}
      <span>{name}</span>
    </div>
  );
}

const CX = 350;
const CY = 350;

export default function Skills() {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();

    const update = (now: number) => {
      const t = (now - startTime) / 1000;

      rings.forEach((ring, ri) => {
        ring.skills.forEach((_, si) => {
          const el = document.getElementById(`skill-bubble-${ri}-${si}`);
          if (!el) return;
          const TWO_PI = Math.PI * 2;
          const angleStep = TWO_PI / ring.skills.length;
          const initialAngle = angleStep * si - Math.PI / 2; // start from top
          const speed = TWO_PI / ring.durationSec;
          const angle = initialAngle + (ring.clockwise ? 1 : -1) * speed * t;
          const x = ring.radius * Math.cos(angle);
          const y = ring.radius * Math.sin(angle);
          el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      id="skills"
      className="scroll-mt-24 overflow-hidden border-t border-zinc-800 bg-zinc-950 pb-12 pt-20"
    >
      {/* Heading */}
      <AnimateOnScroll>
        <h2 className="text-center text-5xl font-bold tracking-tight text-white md:text-6xl">
          Skills
        </h2>
        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Technical Soft &amp; Software
        </p>
      </AnimateOnScroll>

      {/* Orbital canvas */}
      <div className="relative mx-auto mt-8" style={{ width: 700, height: 700 }}>
        {/* Decorative orbit circles */}
        {rings.map((ring, i) => (
          <div
            key={`ring-path-${i}`}
            className="pointer-events-none absolute rounded-full border border-zinc-700/30"
            style={{
              width: ring.radius * 2,
              height: ring.radius * 2,
              top: CY - ring.radius,
              left: CX - ring.radius,
            }}
          />
        ))}

        {/* Center badge */}
        <div
          className="absolute z-20 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-600/60 bg-zinc-800 text-lg font-bold text-zinc-300 shadow-[0_0_30px_rgba(120,160,255,0.1)]"
          style={{ top: CY - 40, left: CX - 40 }}
        >
          {"</>"}
        </div>

        {/* Skill bubbles — positioned via JS (always upright) */}
        {rings.map((ring, ri) =>
          ring.skills.map((name, si) => (
            <div
              id={`skill-bubble-${ri}-${si}`}
              key={`${ri}-${si}`}
              className="absolute z-10"
              style={{ top: CY, left: CX }}
            >
              <SkillPill name={name} size={ring.size} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
