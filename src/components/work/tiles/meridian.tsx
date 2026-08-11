import { ArtTile, artTileSrc } from "./art";

export function MeridianTile(props: { className?: string }) {
  return (
    <ArtTile
      id="meridian"
      from="#0891b2"
      to="#020617"
      letter="M"
      label="MERIDIAN"
      {...props}
    />
  );
}

export const meridianTileSrc = artTileSrc("#0891b2", "#020617", "M", "MERIDIAN");
