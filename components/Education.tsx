"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { education } from "@/lib/data";

function SchoolLogo({
  logo,
  initials,
  school,
  size = "lg",
}: {
  logo?: string;
  initials?: string;
  school: string;
  size?: "lg" | "sm";
}) {
  const [error, setError] = useState(false);
  const dim = size === "lg" ? "h-28 w-28 md:h-36 md:w-36" : "h-14 w-14";

  if (logo && !error) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={school}
        onError={() => setError(true)}
        className={`${dim} object-contain drop-shadow-lg`}
      />
    );
  }

  return (
    <div
      className={`${dim} flex items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-xl font-bold text-white`}
    >
      {initials ?? school.slice(0, 3).toUpperCase()}
    </div>
  );
}


export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-t border-zinc-200 px-6 py-16 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-3xl">
        <AnimateOnScroll>
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
            Education
          </h2>
        </AnimateOnScroll>

        <div className="space-y-6">
          {education.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 120} from="left">
              <div className="relative flex gap-6">
                {/* ซ้าย: ปี + เส้น timeline */}
                <div className="flex flex-shrink-0 flex-col items-center">
                  <span className="w-12 text-right text-xl font-medium text-zinc-400 dark:text-zinc-500">
                    {item.period.split(" ")[0]}
                  </span>
                  <span className="mt-1 h-full min-h-[2rem] w-px bg-zinc-200 dark:bg-zinc-700" />
                </div>

                {/* Card */}
                <div className="relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a2a5c] via-[#1a3f7c] to-[#071a3e] p-5 shadow-lg">
                  {/* โลโก้ใหญ่ด้านขวา */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-90 pointer-events-none select-none">
                    <SchoolLogo
                      logo={item.logo}
                      initials={item.logoInitials}
                      school={item.school}
                      size="lg"
                    />
                  </div>

                  {/* เนื้อหาซ้าย */}
                  <div className="relative z-10 pr-32 md:pr-44">
                    <p className="text-sm font-medium text-white/70">
                      {item.degree} @ {item.school}
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      {item.period}
                    </p>

                    {(item.location || item.link) && (
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/70">
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                            {item.location}
                          </span>
                        )}
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 underline transition-colors hover:text-white"
                          >
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
                            </svg>
                            {item.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </a>
                        )}
                      </div>
                    )}

                    {item.description && (
                      <p className="mt-3 text-sm leading-relaxed text-white/80">
                        {item.description}
                      </p>
                    )}

                    {item.program && (
                      <span className="mt-3 inline-block rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                        {item.program}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
