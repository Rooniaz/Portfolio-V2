"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { contactForm } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.message ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-zinc-200 px-6 py-16 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-xl">
        <AnimateOnScroll>
          <h2 className="mb-2 text-center text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
            {contactForm.title}
          </h2>
          <p className="mb-8 text-center text-zinc-600 dark:text-zinc-400">
            {contactForm.subtitle}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100} from="right">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-200 bg-green-50 px-8 py-12 text-center dark:border-green-800/50 dark:bg-green-950/30">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                <svg
                  className="h-7 w-7 text-green-600 dark:text-green-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-green-800 dark:text-green-300">
                Message sent!
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 rounded-full border border-green-300 px-5 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/40"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="hidden" name="access_key" value={contactForm.web3formsKey} />
              <input type="hidden" name="subject" value="New message from Portfolio" />
              <input type="checkbox" name="botcheck" className="hidden" />

              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:border-zinc-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:border-zinc-500"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                required
                className="rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 transition duration-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:border-zinc-500"
              />

              {status === "error" && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-400">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:scale-105 hover:bg-zinc-700 active:scale-100 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3" />
                      <path d="M12 3a9 9 0 019 9" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  contactForm.submitLabel
                )}
              </button>
            </form>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
