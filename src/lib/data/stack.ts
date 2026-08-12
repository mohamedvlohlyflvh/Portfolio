import type { ComponentType } from "react";
import { Braces, HardDrive, Layers } from "lucide-react";
import { FaWindows } from "react-icons/fa";
import {
  SiExpress,
  SiGithub,
  SiLinux,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

/** Accepts either Simple Icons brand marks or lucide glyphs. */
export type ToolIcon = ComponentType<{ className?: string }>;

export interface StackTool {
  name: string;
  icon: ToolIcon;
}

export interface StackCategory {
  id: string;
  title: string;
  description: string;
  tools: StackTool[];
}

export const stackCategories: StackCategory[] = [
  {
    id: "frontend",
    title: "Frontend & UI",
    description:
      "Interface, state, and offline-first data — the layer users actually touch.",
    tools: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Zustand", icon: Layers },
      { name: "Dexie.js", icon: HardDrive },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description: "The server side — endpoints, jobs, and the glue in between.",
    tools: [
      { name: "Python", icon: SiPython },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "REST", icon: Braces },
    ],
  },
  {
    id: "data",
    title: "Database & ORM",
    description: "Schemas and queries that stay honest under real traffic.",
    tools: [
      { name: "Prisma ORM", icon: SiPrisma },
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    id: "tools",
    title: "Tools & Infrastructure",
    description: "The daily driver — from version control to deploy.",
    tools: [
      { name: "Git / GitHub", icon: SiGithub },
      { name: "Netlify", icon: SiNetlify },
      { name: "Linux (Arch / Fedora)", icon: SiLinux },
      { name: "Windows", icon: FaWindows },
      { name: "Vercel", icon: SiVercel },
    ],
  },
];