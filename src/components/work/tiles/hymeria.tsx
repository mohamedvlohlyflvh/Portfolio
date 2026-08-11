import { ArtTile, artTileSrc } from "./art";

export function HymeriaTile(props: { className?: string }) {
  return (
    <ArtTile
      id="hymeria"
      from="#0d9488"
      to="#020617"
      letter="H"
      label="HYMERIA"
      {...props}
    />
  );
}

export const hymeriaTileSrc = artTileSrc("#0d9488", "#020617", "H", "HYMERIA");
