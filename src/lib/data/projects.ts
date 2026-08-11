import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiVercel,
  SiVite,
  SiGoogle,
  SiGithub,
} from "react-icons/si";
import {
  Database,
  Map,
  AudioLines,
  Terminal,
} from "lucide-react";
import { hymeriaTileSrc } from "@/components/work/tiles/hymeria";
import { meridianTileSrc, MeridianTile } from "@/components/work/tiles/meridian";
import { graticuleTileSrc, GraticuleTile } from "@/components/work/tiles/graticule";
import { cassetteTileSrc, CassetteTile } from "@/components/work/tiles/cassette";

/**
 * Featured work — two shipped apps + prototypes.
 * Replace the placeholder GitHub links / placeholder projects with real ones.
 *
 * Span contract (progressive breakpoints):
 *   base  → 1×1 single column (mobile)
 *   sm    → 6-col tablet grid (featured 6 / others 3)
 *   lg    → 12-col asymmetric bento (7×2 featured + 5/5/5/7)
 * Tiles live as components in `src/components/work/tiles/` — this file only
 * references them (plus their data-URL strings for the hover-reveal shelf).
 */
export const GITHUB = "https://github.com/mohamedvlohlyflvh";

export type ProjectStack = { icon: IconType; label: string };
export type Preview = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  gloss: string;
  description: string;
  stack: ProjectStack[];
  demo?: string;
  github: string;
  previews: Preview[];
  tile?: ComponentType<{ className?: string }>;
  span: string;
  year: string;
  featured?: boolean;
};

const dexieIcon: IconType = Database;
const authIcon: IconType = SiGoogle;
const dbIcon: IconType = Database;
const mapIcon: IconType = Map;
const whisperIcon: IconType = AudioLines;
const apiIcon: IconType = Terminal;

export const PROJECTS: Project[] = [
  {
    slug: "qestak",
    name: "Qestak",
    gloss: "قسطك — installment tracker",
    description:
      "Split, plan and settle installments with people. Local-first by design: every debt plan lives in your browser's IndexedDB — no servers, no sign-up walls, money in plain EGP.",
    stack: [
      { icon: SiNextdotjs, label: "Next.js" },
      { icon: SiTypescript, label: "TypeScript" },
      { icon: SiReact, label: "React" },
      { icon: dexieIcon, label: "Dexie / IndexedDB" },
      { icon: SiTailwindcss, label: "Tailwind" },
      { icon: authIcon, label: "Auth" },
    ],
    demo: "https://qestak.vercel.app/",
    github: `${GITHUB}/qestak`,
    previews: [
      { src: "/work/qestak.png", alt: "Qestak — the live app" },
    ],
    span: "col-span-1 row-span-1 sm:col-span-6 lg:col-span-7 lg:row-span-2",
    year: "2026",
    featured: true,
  },
  {
    slug: "hymeria-toolkit",
    name: "Hymeria Toolkit",
    gloss: "design kit, living",
    description:
      "My working design-toolkit app: tokens, components and utilities for building dark, fast interfaces — the same system this portfolio ships on.",
    stack: [
      { icon: SiNextdotjs, label: "Next.js" },
      { icon: SiReact, label: "React" },
      { icon: SiTypescript, label: "TypeScript" },
      { icon: dexieIcon, label: "Dexie" },
      { icon: SiTailwindcss, label: "Tailwind" },
      { icon: authIcon, label: "Auth.js" },
    ],
    demo: "https://hymeria-toolkit.vercel.app/",
    github: `${GITHUB}/hymeria-toolkit`,
    previews: [
      { src: "/work/hymeria.png", alt: "Hymeria Toolkit — the live app" },
      {
        src: hymeriaTileSrc,
        alt: "Hymeria Toolkit brand tile",
      },
    ],
    span: "col-span-1 row-span-1 sm:col-span-3 lg:col-span-5",
    year: "2026",
  },
  {
    slug: "meridian",
    name: "Meridian",
    gloss: "realtime ops dashboard",
    description:
      "Latency, errors and deploys on one live grid — a single pane for what's actually breaking in production.",
    stack: [
      { icon: SiNextdotjs, label: "Next.js" },
      { icon: SiTypescript, label: "TypeScript" },
      { icon: SiNodedotjs, label: "Node.js" },
      { icon: SiPostgresql, label: "Postgres" },
      { icon: SiSupabase, label: "Supabase" },
      { icon: SiTailwindcss, label: "Tailwind" },
    ],
    github: `${GITHUB}/meridian`,
    previews: [
      {
        src: meridianTileSrc,
        alt: "Meridian brand tile",
      },
    ],
    tile: MeridianTile,
    span: "col-span-1 row-span-1 sm:col-span-3 lg:col-span-5",
    year: "2025",
  },
  {
    slug: "graticule",
    name: "Graticule",
    gloss: "map explorer",
    description:
      "GPX traces, elevation profiles and offline tiles — maps that keep working when the network doesn't.",
    stack: [
      { icon: SiVite, label: "Vite" },
      { icon: SiReact, label: "React" },
      { icon: SiTypescript, label: "TypeScript" },
      { icon: mapIcon, label: "MapLibre" },
      { icon: dbIcon, label: "Offline tiles" },
    ],
    github: `${GITHUB}/graticule`,
    previews: [
      {
        src: graticuleTileSrc,
        alt: "Graticule brand tile",
      },
    ],
    tile: GraticuleTile,
    span: "col-span-1 row-span-1 sm:col-span-3 lg:col-span-5",
    year: "2025",
  },
  {
    slug: "cassette",
    name: "Cassette",
    gloss: "audio diary",
    description:
      "Record, transcribe and search voice notes — transcription runs locally, so the audio never leaves the machine.",
    stack: [
      { icon: SiNextdotjs, label: "Next.js" },
      { icon: SiPython, label: "Python" },
      { icon: whisperIcon, label: "Whisper" },
      { icon: dexieIcon, label: "IndexedDB" },
      { icon: SiVercel, label: "Vercel" },
    ],
    github: `${GITHUB}/cassette`,
    previews: [
      {
        src: cassetteTileSrc,
        alt: "Cassette brand tile",
      },
    ],
    tile: CassetteTile,
    span: "col-span-1 row-span-1 sm:col-span-3 lg:col-span-7",
    year: "2024",
  },
];

export const GITHUB_ICON = SiGithub;
export { apiIcon };
