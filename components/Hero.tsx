import Link from "next/link";
import Image from "next/image";
import { hero } from "@/lib/data";
import HeroParallax from "@/components/HeroParallax";

const HERO_BG_IMAGE = "/hero-bg.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background: รูป พร้อม Parallax */}
      {HERO_BG_IMAGE ? (
        <>
          <HeroParallax>
            <Image
              src={HERO_BG_IMAGE}
              alt=""
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </HeroParallax>
          <div
            className="absolute inset-0 z-[1] bg-zinc-900/50 dark:bg-zinc-950/60"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-[linear-gradient(135deg,#fafafa_0%,#e4e4e7_50%,#d4d4d8_100%)] dark:opacity-0"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(135deg,#18181b_0%,#27272a_50%,#3f3f46_100%)] opacity-0 dark:opacity-100"
            aria-hidden
          />
        </>
      )}

      <div className="relative z-10 text-center animate-hero-in">
      <h1
        className={`mb-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${
          HERO_BG_IMAGE
            ? "text-white"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {hero.name}
      </h1>
      <p
        className={`mb-8 text-lg sm:text-xl ${
          HERO_BG_IMAGE ? "text-zinc-200" : "text-zinc-600 dark:text-zinc-400"
        }`}
      >
        {hero.role}
      </p>
      <Link
        href="#contact"
        className={`rounded-full px-6 py-3 text-sm font-medium transition duration-200 hover:scale-105 active:scale-100 ${
          HERO_BG_IMAGE
            ? "bg-white text-zinc-900 hover:bg-zinc-100"
            : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        }`}
      >
        CONTACT
      </Link>
      </div>
    </section>
  );
}
