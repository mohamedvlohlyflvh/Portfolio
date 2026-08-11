"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Total scramble duration in ms (failsafe cap). */
  duration?: number;
  /** Delay before the word appears (hidden until then), in ms. */
  delay?: number;
  /** ms per frame — smaller = faster flicker. */
  stepMs?: number;
}

/**
 * ScrambleText — classic glitchy text-reveal: characters flicker through
 * random glyphs and lock into place left → right. The reduced-motion branch
 * is taken in the render (declarative), so no effect ever calls setState
 * synchronously and toggling the OS setting mid-scramble swaps cleanly.
 */
export function ScrambleText(props: ScrambleTextProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <span className={props.className}>{props.text}</span>;
  }
  return <Scrambler {...props} />;
}

function Scrambler({
  text,
  className,
  duration = 1000,
  delay = 1000,
  stepMs = 200,
}: ScrambleTextProps) {
  // Start invisible — the word appears only when the scramble kicks in (after `delay`).
  const [display, setDisplay] = useState("");

  useEffect(() => {
    // First frame fires after `delay` — that's when the word appears, already
    // scrambling. Each subsequent frame locks one more char left → right.
    const timers: ReturnType<typeof setTimeout>[] = [];
    let lockIndex = 0;
    const maxFrames = Math.max(1, Math.floor(duration / stepMs));

    const tick = () => {
      lockIndex += 1;

      // Failsafe: never exceed the requested duration.
      if (lockIndex > text.length || lockIndex > maxFrames) {
        setDisplay(text);
        return;
      }

      let out = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === " ") {
          out += char;
        } else if (i < lockIndex) {
          out += char;
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setDisplay(out);
      timers.push(setTimeout(tick, stepMs));
    };

    timers.push(setTimeout(tick, delay));
    return () => timers.forEach(clearTimeout);
  }, [text, duration, delay, stepMs]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}