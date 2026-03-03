"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { projects, type ProjectCategory } from "@/lib/data";

const filters: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "game", label: "Game Development" },
  { value: "web", label: "Web Development" },
  { value: "app", label: "App Development" },
];

function getCount(cat: ProjectCategory) {
  if (cat === "all") return projects.length;
  return projects.filter((p) => p.category === cat).length;
}

function ProjectCard({
  project,
  hasImage,
}: {
  project: (typeof projects)[number];
  hasImage: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const showBgImage = hasImage && project.image && !imgError;

  return (
    <a
      href={`/projects/${project.id}`}
      className="group relative block min-h-[200px] overflow-hidden rounded-xl border border-zinc-200 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:shadow-zinc-900/30"
    >
      {/* พื้นหลัง: รูปหรือ gradient */}
      {showBgImage && (
        <>
          <Image
            src={project.image!}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
            onError={() => setImgError(true)}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30"
            aria-hidden
          />
        </>
      )}
      {!showBgImage && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800"
          aria-hidden
        />
      )}

      {/* เนื้อหาการ์ด */}
      <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-end p-5">
        <h3
          className={`font-semibold ${
            showBgImage ? "text-white" : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-1 line-clamp-2 text-sm ${
            showBgImage ? "text-zinc-200" : "text-zinc-600 dark:text-zinc-400"
          }`}
        >
          {project.description}
        </p>
        <span
          className={`mt-2 inline-block text-xs font-medium uppercase tracking-wide ${
            showBgImage ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-500"
          }`}
        >
          {project.category === "game"
            ? "Game Development"
            : project.category === "web"
              ? "Web Development"
              : "App Development"}
        </span>
      </div>
    </a>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-zinc-200 px-6 py-16 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
            Projects
          </h2>
          <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
            Filter by
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <div className="mb-10 flex flex-wrap gap-4">
            {filters.map((f) => {
              const count = getCount(f.value);
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 hover:scale-105 active:scale-100 dark:border-zinc-700 ${
                    filter === f.value
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                      : "border-zinc-300 text-zinc-700 hover:border-zinc-400 dark:text-zinc-300 dark:hover:border-zinc-600"
                  }`}
                >
                  {f.label} ({count})
                </button>
              );
            })}
          </div>
        </AnimateOnScroll>
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((project, index) => (
            <AnimateOnScroll
              key={project.id}
              delay={150 + index * 80}
              from={index % 2 === 0 ? "left" : "right"}
            >
              <ProjectCard
                project={project}
                hasImage={!!project.image}
              />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
