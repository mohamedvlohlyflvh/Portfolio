import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with proper precedence.
 * Usage: cn("base", condition && "active", variantClass)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}