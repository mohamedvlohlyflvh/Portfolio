/**
 * Shared art-tile primitives.
 * Each placeholder project gets an honest brand-colored geometry tile —
 * generated SVG, not a fake product shot. Two faces of the same art:
 * - `ArtTile` — inline SVG component (rendered inside bento card previews)
 * - `artTileSrc` — data-URL string (consumed by HoverImageReveal, which
 *   needs real `src` values to preload/chase)
 */

export function artTileSrc(
  from: string,
  to: string,
  letter: string,
  label: string,
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <rect width="1200" height="800" fill="url(#grid)"/>
  <circle cx="946" cy="170" r="252" fill="none" stroke="rgba(203,213,225,0.12)" stroke-width="34"/>
  <circle cx="946" cy="170" r="176" fill="rgba(203,213,225,0.05)"/>
  <text x="76" y="548" font-family="ui-monospace,monospace" font-size="330" font-weight="700" fill="rgba(255,255,255,0.08)">${letter}</text>
  <rect x="76" y="636" width="176" height="6" rx="3" fill="#22d3ee" opacity="0.9"/>
  <text x="76" y="700" font-family="ui-monospace,monospace" font-size="26" letter-spacing="9" fill="rgba(226,232,240,0.65)">${label}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export type ArtTileProps = {
  id: string;
  from: string;
  to: string;
  letter: string;
  label: string;
  className?: string;
};

export function ArtTile({
  id,
  from,
  to,
  letter,
  label,
  className = "",
}: ArtTileProps) {
  /* Unique gradient/pattern ids per tile — multiple inline tiles share one DOM. */
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`${label} brand tile`}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <pattern
          id={`${id}-grid`}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0H0V48"
            fill="none"
            stroke="rgba(255,255,255,0.045)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="1200" height="800" fill={`url(#${id}-g)`} />
      <rect width="1200" height="800" fill={`url(#${id}-grid)`} />
      <circle
        cx="946"
        cy="170"
        r="252"
        fill="none"
        stroke="rgba(203,213,225,0.12)"
        strokeWidth="34"
      />
      <circle cx="946" cy="170" r="176" fill="rgba(203,213,225,0.05)" />
      <text
        x="76"
        y="548"
        fontFamily="ui-monospace,monospace"
        fontSize="330"
        fontWeight="700"
        fill="rgba(255,255,255,0.08)"
      >
        {letter}
      </text>
      <rect x="76" y="636" width="176" height="6" rx="3" fill="#22d3ee" opacity="0.9" />
      <text
        x="76"
        y="700"
        fontFamily="ui-monospace,monospace"
        fontSize="26"
        letterSpacing="9"
        fill="rgba(226,232,240,0.65)"
      >
        {label}
      </text>
    </svg>
  );
}