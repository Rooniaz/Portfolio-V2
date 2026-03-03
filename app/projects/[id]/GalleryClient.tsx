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
    <div>
      {/* Thumbnail strip */}
      <div className="relative flex items-center gap-3">
        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={prev}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300 transition hover:bg-zinc-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Thumbnails */}
        <div className="flex flex-1 gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                active === i
                  ? "border-blue-500 opacity-100"
                  : "border-zinc-700 opacity-60 hover:opacity-90"
              }`}
            >
              {!imgErrors[i] ? (
                <Image
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="160px"
                  onError={() => setImgErrors((e) => ({ ...e, [i]: true }))}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-zinc-800 text-xs text-zinc-500">
                  {i + 1}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={next}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300 transition hover:bg-zinc-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Lightbox preview */}
      {images.length > 0 && (
        <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-800">
          {!imgErrors[active] ? (
            <Image
              src={images[active]}
              alt={`${title} screenshot ${active + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 900px"
              onError={() => setImgErrors((e) => ({ ...e, [active]: true }))}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
              Image not available
            </div>
          )}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <span className="absolute bottom-3 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-zinc-300 backdrop-blur-sm">
                {active + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
