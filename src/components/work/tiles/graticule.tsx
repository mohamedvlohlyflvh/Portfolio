import { ArtTile, artTileSrc } from "./art";

export function GraticuleTile(props: { className?: string }) {
  return (
    <ArtTile
      id="graticule"
      from="#0f766e"
      to="#020617"
      letter="G"
      label="GRATICULE"
      {...props}
    />
  );
}

export const graticuleTileSrc = artTileSrc("#0f766e", "#020617", "G", "GRATICULE");
