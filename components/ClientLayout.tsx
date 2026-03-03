"use client";

import { useState, useEffect } from "react";
import IntroScreen from "@/components/IntroScreen";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // null = ยังไม่รู้ (กำลัง hydrate), true = ผ่านแล้ว, false = ยังไม่ผ่าน
  const [introDone, setIntroDone] = useState<boolean | null>(null);

  useEffect(() => {
    const already = sessionStorage.getItem("intro-done") === "1";
    setIntroDone(already);
  }, []);

  const handleDone = () => {
    sessionStorage.setItem("intro-done", "1");
    setIntroDone(true);
  };

  // ระหว่าง hydrate ให้ render children ซ่อนไว้ก่อน เพื่อไม่ให้ flicker
  if (introDone === null) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <>
      {!introDone && <IntroScreen onDone={handleDone} />}
      <div
        style={{
          visibility: introDone ? "visible" : "hidden",
          opacity: introDone ? 1 : 0,
          transition: introDone ? "opacity 0.4s ease" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
