import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import GalleryClient from "./GalleryClient";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

const categoryLabel: Record<string, string> = {
  game: "Game Development",
  web: "Web Development",
  app: "App Development",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const mainImage = project.image ?? null;
  const gallery = project.gallery ?? [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navbar placeholder space */}
      <div className="h-16" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-zinc-300 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-zinc-300">{project.title}</span>
        </nav>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          {project.title}
        </h1>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300"
              >
                {tag}
              </span>
            ))}
            <span className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
              {categoryLabel[project.category]}
            </span>
          </div>
        )}

        {/* Main content: image + info */}
        <div className="mb-12 grid gap-8 md:grid-cols-[2fr,3fr] md:items-start">
          {/* Main image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-800">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-500">
                No Image
              </div>
            )}
          </div>

          {/* Description + GitHub */}
          <div>
            <p className="leading-relaxed text-zinc-300">
              {project.fullDescription ?? project.description}
            </p>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Github →
              </a>
            )}
          </div>
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div>
            <h2 className="mb-5 text-lg font-semibold text-zinc-200">
              Screenshots
            </h2>
            <GalleryClient images={gallery} title={project.title} />
          </div>
        )}

        {/* Back */}
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-200"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
