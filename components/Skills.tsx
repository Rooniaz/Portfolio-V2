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

const categories = [
  {
    key: "frontend",
    label: "Frontend",
    color: "from-blue-600/20 to-blue-500/5 border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    dot: "bg-blue-400",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Angular", "Bootstrap", "WordPress"],
  },
  {
    key: "backend",
    label: "Backend",
    color: "from-emerald-600/20 to-emerald-500/5 border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    dot: "bg-emerald-400",
    skills: ["Node.js", "PostgreSQL", "SQL", "Java", "Spring Boot", "Flask"],
  },
  {
    key: "testing",
    label: "Testing",
    color: "from-amber-600/20 to-amber-500/5 border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    dot: "bg-amber-400",
    skills: ["Playwright"],
  },
];

const sizeStyles = {
  lg: { pill: "px-4 py-2.5 gap-2.5 text-sm", box: "h-9 w-9 rounded-xl", icon: "h-5 w-5" },
  md: { pill: "px-3.5 py-2 gap-2 text-xs", box: "h-7 w-7 rounded-lg", icon: "h-4 w-4" },
  sm: { pill: "px-3 py-1.5 gap-1.5 text-xs", box: "h-6 w-6 rounded-md", icon: "h-3.5 w-3.5" },
};

function SkillIcon({ name, className }: { name: string; className?: string }) {
  const [err, setErr] = useState(false);
  const url = iconMap[name];
  if (!url || err) {
    return (
      <span className={`flex items-center justify-center rounded-md bg-zinc-700 text-[10px] font-bold text-zinc-300 ${className}`}>
        {name[0]}
      </span>
    );
  }
  return (
    <img src={url} alt="" className={`object-contain ${className}`} onError={() => setErr(true)} />
  );
}

function SkillPill({ name, size }: { name: string; size: "lg" | "md" | "sm" }) {
  const s = sizeStyles[size];
  return (
    <div className={`inline-flex items-center whitespace-nowrap select-none rounded-full border border-zinc-700/80 bg-zinc-900/95 font-medium text-zinc-100 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${s.pill}`}>
      <span className={`flex flex-shrink-0 items-center justify-center bg-zinc-800 ${s.box}`}>
        <SkillIcon name={name} className={s.icon} />
      </span>
      <span>{name}</span>
    </div>
  );
}

const CX = 350;
const CY = 350;

export default function Skills() {
  const rafRef = useRef<number>(0);
  const [view, setView] = useState<"orbital" | "category">("orbital");
  const [transitioning, setTransitioning] = useState(false);
  const [orbitalScale, setOrbitalScale] = useState(1);

  // On mobile default to category; track scale for orbital canvas
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        setView("category");
      }
      const scale = Math.min(1, (vw - 32) / 700);
      setOrbitalScale(scale);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (view !== "orbital") return;

    const startTime = performance.now();
    const update = (now: number) => {
      const t = (now - startTime) / 1000;
      rings.forEach((ring, ri) => {
        ring.skills.forEach((_, si) => {
          const el = document.getElementById(`skill-bubble-${ri}-${si}`);
          if (!el) return;
          const TWO_PI = Math.PI * 2;
          const angleStep = TWO_PI / ring.skills.length;
          const initialAngle = angleStep * si - Math.PI / 2;
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
  }, [view]);

  const toggleView = () => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setView((v) => (v === "orbital" ? "category" : "orbital"));
      setTransitioning(false);
    }, 300);
  };

  return (
    <section
      id="skills"
      className="scroll-mt-24 overflow-hidden border-t border-zinc-800 bg-zinc-950 pb-12 pt-20"
    >
      <AnimateOnScroll>
        <h2 className="text-center text-5xl font-bold tracking-tight text-white md:text-6xl">
          Skills
        </h2>
        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Technical Soft &amp; Software
        </p>
      </AnimateOnScroll>

      {/* ── ORBITAL VIEW ── */}
      <div
        className="mt-8 overflow-hidden"
        style={{
          display: view === "category" ? "none" : "block",
          opacity: view === "orbital" && !transitioning ? 1 : 0,
          transition: "opacity 0.3s ease",
          // shrink wrapper height to match scaled canvas so no empty space below
          height: 700 * orbitalScale,
        }}
      >
      <div
        className="relative mx-auto origin-top"
        style={{
          width: 700,
          height: 700,
          transform: `scale(${orbitalScale})`,
          transformOrigin: "top center",
        }}
      >
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

        {/* Center button */}
        <button
          onClick={toggleView}
          title="Switch to category view"
          className="absolute z-20 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-zinc-600/60 bg-zinc-800 text-lg font-bold text-zinc-300 shadow-[0_0_30px_rgba(120,160,255,0.1)] transition hover:scale-110 hover:border-zinc-400 hover:text-white"
          style={{ top: CY - 40, left: CX - 40 }}
        >
          {"</>"}
        </button>

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
      </div>

      {/* ── CATEGORY VIEW ── */}
      <div
        className="mx-auto mt-8 max-w-4xl px-6"
        style={{
          opacity: view === "category" && !transitioning ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: view === "orbital" ? "none" : "block",
        }}
      >
        {/* Back button — hidden on mobile (orbital doesn't make sense on small screens) */}
        <div className="mb-8 hidden justify-center sm:flex">
          <button
            onClick={toggleView}
            className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 px-5 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M8 12l4-4 4 4M12 8v8" />
            </svg>
            Back to orbit
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className={`rounded-2xl border bg-gradient-to-b p-5 ${cat.color}`}
            >
              {/* Category header */}
              <div className="mb-4 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${cat.dot}`} />
                <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${cat.badge}`}>
                  {cat.label}
                </span>
              </div>

              {/* Skills list */}
              <div className="flex flex-col gap-2.5">
                {cat.skills.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-xl border border-zinc-700/60 bg-zinc-900/80 px-3 py-2.5"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                      <SkillIcon name={name} className="h-5 w-5 object-contain" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
