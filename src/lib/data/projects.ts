import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGithub,
  SiGoogle,
} from "react-icons/si";
import { Database } from "lucide-react";
import { hymeriaTileSrc } from "@/components/work/tiles/hymeria";

/**
 * Selected work — two shipped apps.
 *
 * Span contract (progressive breakpoints):
 *   base  → 1×1 single column (mobile)
 *   sm    → 6-col tablet grid
 *   lg    → 12-col asymmetric bento (7×2 featured + 5)
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
    github: `${GITHUB}/Hymerious`,
    previews: [
      { src: "/work/hymeria.png", alt: "Hymeria Toolkit — the live app" },
      { src: hymeriaTileSrc, alt: "Hymeria Toolkit brand tile" },
    ],
    span: "col-span-1 row-span-1 sm:col-span-6 lg:col-span-5",
    year: "2026",
  },
];

export const GITHUB_ICON = SiGithub;
