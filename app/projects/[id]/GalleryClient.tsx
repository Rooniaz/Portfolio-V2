"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryClient({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Main preview ── */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-900">
        {!imgErrors[active] ? (
          <Image
            src={images[active]}
            alt={`${title} ${active + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 900px"
            onError={() => setImgErrors((e) => ({ ...e, [active]: true }))}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            Image not available
          </div>
        )}

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <span className="absolute bottom-3 right-4 rounded-full bg-black/60 px-3 py-1 text-xs text-zinc-300 backdrop-blur-sm">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* ── Thumbnail grid (wraps, no scrollbar) ── */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-7">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-video overflow-hidden rounded-md border-2 transition ${
                active === i
                  ? "border-blue-500 opacity-100"
                  : "border-zinc-700/60 opacity-50 hover:opacity-80"
              }`}
            >
              {!imgErrors[i] ? (
                <Image
                  src={src}
                  alt={`${title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                  onError={() => setImgErrors((e) => ({ ...e, [i]: true }))}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-zinc-800 text-[10px] text-zinc-500">
                  {i + 1}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
