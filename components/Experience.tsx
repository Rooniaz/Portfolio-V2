"use client";

import React, { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { experience } from "@/lib/data";

const DEFAULT_GALLERY_COUNT = 6;

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const galleryItemClass =
  "relative w-full overflow-hidden rounded-lg border border-zinc-700/80 bg-zinc-800/80 shadow-[0_4px_12px_rgba(0,0,0,0.4)]";

function GallerySlot({
  src,
  label,
  className,
  style,
}: {
  src: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`${galleryItemClass} flex items-center justify-center text-zinc-500 text-xs ${className ?? ""}`}
        style={style}
      >
        {label}
      </div>
    );
  }

  return (
    <div className={`${galleryItemClass} ${className ?? ""}`} style={style}>
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
        onError={() => setError(true)}
      />
    </div>
  );
}

export default function Experience() {
  const [bannerError, setBannerError] = useState(false);
  const gallery =
    experience.galleryImages && experience.galleryImages.length > 0
      ? experience.galleryImages
      : Array.from({ length: DEFAULT_GALLERY_COUNT }, (_, i) => "");
  const hasBanner = !!experience.bannerImage && !bannerError;

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-zinc-800 bg-zinc-950 px-0 py-0 dark:border-zinc-800"
    >
      {/* หัวข้อ Experience */}
      <div className="px-6 pt-16 pb-8">
        <AnimateOnScroll>
          <h2 className="text-center text-4xl font-bold tracking-tight text-white md:text-5xl">
            Experience
          </h2>
        </AnimateOnScroll>
      </div>

      {/* แบนเนอร์ใหญ่: พื้นหลังเบลอ + ข้อความกลาง */}
      <div className="relative mx-4 overflow-hidden rounded-2xl md:mx-6">
        <AnimateOnScroll delay={80}>
          <div className="relative min-h-[220px] flex flex-col items-center justify-center px-6 py-12 md:min-h-[280px]">
            {/* พื้นหลังรูป (เบลอ) */}
            {hasBanner && (
              <>
                <Image
                  src={experience.bannerImage!}
                  alt=""
                  fill
                  className="scale-105 object-cover blur-md"
                  sizes="100vw"
                  onError={() => setBannerError(true)}
                />
                <div className="absolute inset-0 bg-black/70" aria-hidden />
              </>
            )}
            {!hasBanner && (
              <div
                className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
                aria-hidden
              />
            )}

            {/* ข้อความกลาง */}
            <div className="relative z-10 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-zinc-300 md:text-base">
                {experience.highlight}
              </p>
              <p className="mt-2 text-4xl font-bold uppercase tracking-tight text-red-500 md:text-5xl lg:text-6xl">
                {experience.company}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white md:text-base">
                {experience.duration.split(/(\d+)/).map((part, i) =>
                  /^\d+$/.test(part) ? (
                    <span key={i} className="text-red-400">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* ล่างแบนเนอร์: What's I Do? + กริดรูป */}
      <div className="px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr,1.2fr] md:gap-12">
          {/* ซ้าย: What's I Do? + คำอธิบาย */}
          <AnimateOnScroll delay={120} from="left">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-red-500 text-white">
                  <MonitorIcon className="h-4 w-4" />
                </span>
                What&apos;s I Do?
              </h3>
              <p className="mt-4 leading-relaxed text-zinc-300">
                {experience.description}
              </p>
            </div>
          </AnimateOnScroll>

          {/* ขวา: กริดรูปแบบอ้างอิง
               cols: 3 | rows: 3
               [  img1 (2col,2row)  ][img2]
               [  img1 (2col,2row)  ][img3]
               [  img4  ][  img5  ][img6]
          */}
          <AnimateOnScroll delay={160} from="right">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, auto)",
              }}
            >
              {/* img1 — ใหญ่ซ้าย: 2 คอลัมน์, 2 แถว */}
              <GallerySlot
                src={gallery[0] ?? ""}
                label="Image 1"
                className="aspect-[4/3]"
                style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}
              />
              {/* img2 — ขวาบน */}
              <GallerySlot
                src={gallery[1] ?? ""}
                label="Image 2"
                className="aspect-[4/3]"
                style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}
              />
              {/* img3 — ขวากลาง */}
              <GallerySlot
                src={gallery[2] ?? ""}
                label="Image 3"
                className="aspect-[4/3]"
                style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}
              />
              {/* img4, img5, img6 — แถวล่างเท่ากัน */}
              <GallerySlot
                src={gallery[3] ?? ""}
                label="Image 4"
                className="aspect-[4/3]"
                style={{ gridColumn: "1 / 2", gridRow: "3 / 4" }}
              />
              <GallerySlot
                src={gallery[4] ?? ""}
                label="Image 5"
                className="aspect-[4/3]"
                style={{ gridColumn: "2 / 3", gridRow: "3 / 4" }}
              />
              <GallerySlot
                src={gallery[5] ?? ""}
                label="Image 6"
                className="aspect-[4/3]"
                style={{ gridColumn: "3 / 4", gridRow: "3 / 4" }}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}