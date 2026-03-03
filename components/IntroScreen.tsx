"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*0123456789";
const TARGET = "ROONIAZ";

type Phase = "idle" | "scramble" | "ready" | "explode" | "fade" | "done";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function IntroScreen({ onDone }: { onDone: () => void }) {
  // Start with empty string to avoid SSR/client mismatch
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const rafRef = useRef<number>(0);

  // Init on client only — avoids hydration mismatch
  useEffect(() => {
    setText(Array.from({ length: TARGET.length }, randomChar).join(""));
    setPhase("scramble");
  }, []);

  /* ── Text scramble → reveal ── */
  useEffect(() => {
    if (phase !== "scramble") return;

    const startTime = performance.now();
    const duration = 2200;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);

      const newText = TARGET.split("")
        .map((char, i) => {
          if (progress > (i / TARGET.length) * 0.75 + 0.25) return char;
          return randomChar();
        })
        .join("");

      setText(newText);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setText(TARGET);
        setPhase("ready");
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  /* ── Handle Enter / Click ── */
  const handleEnter = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("explode");

    // delay before orange starts expanding + cover time + fade out
    setTimeout(() => {
      setPhase("fade");
      setTimeout(() => {
        setPhase("done");
        onDone();
      }, 400);
    }, 900);
  }, [phase, onDone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleEnter]);

  if (phase === "done") return null;

  const exploding = phase === "explode" || phase === "fade";

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#09090b",
        cursor: phase === "ready" ? "pointer" : "default",
      }}
      onClick={handleEnter}
    >
      {/* ── Orange circle explosion ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#f97316",
          clipPath: exploding
            ? "circle(200vmax at 50% 50%)"
            : "circle(0px at 50% 50%)",
          /* delay 150ms so the click feels intentional before it bursts */
          transition: exploding
            ? "clip-path 0.85s 0.15s cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        }}
      />

      {/* ── Text ── */}
      <div
        className="relative z-10 select-none text-center"
        style={{
          opacity: phase === "fade" ? 0 : 1,
          transition: phase === "fade" ? "opacity 0.25s ease" : "none",
        }}
      >
        <p
          className="font-mono font-black tracking-widest text-white"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 7rem)",
            letterSpacing: "0.18em",
            textShadow: "0 0 40px rgba(255,255,255,0.15)",
          }}
          suppressHydrationWarning
        >
          {text}
        </p>

        {/* [Enter] prompt */}
        <div
          className="mt-8 text-sm tracking-[0.3em] uppercase"
          style={{
            color: "#a1a1aa",
            opacity: phase === "ready" ? 1 : 0,
            transition: "opacity 0.6s ease",
            animation:
              phase === "ready" ? "intro-blink 1.4s ease infinite" : "none",
          }}
        >
          [ Enter ]
        </div>
      </div>

      <style>{`
        @keyframes intro-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
