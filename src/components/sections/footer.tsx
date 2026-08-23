import { GITHUB, GITHUB_ICON } from "@/lib/data/projects";

/**
 * Footer — quiet closer. Wordmark, one real link, one honest build note.
 * Static on purpose: the page ends on Contact's motion, not this.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="font-display text-sm font-bold uppercase tracking-tight text-slate-300">
          Hymerious<span className="text-cyan-400">.</span>
        </p>

        <p className="text-xs leading-relaxed text-slate-500">
          © 2026 Muhammad Saeed. Built with Next.js, Tailwind&nbsp;v4, Motion — and
          too much coffee.
        </p>

        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile (opens in new tab)"
          className="-my-3 inline-flex items-center gap-2 px-2 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <GITHUB_ICON className="size-4" aria-hidden />
          GitHub
        </a>
      </div>
    </footer>
  );
}
