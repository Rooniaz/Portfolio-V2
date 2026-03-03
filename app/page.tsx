import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="min-h-screen bg-white dark:bg-zinc-950">
        <Hero />
        <Education />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
        <footer className="border-t border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          © {new Date().getFullYear()} Portfolio
        </footer>
      </main>
      <ScrollToTop />
    </>
  );
}
