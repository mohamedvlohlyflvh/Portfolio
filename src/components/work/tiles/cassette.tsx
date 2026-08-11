import { ArtTile, artTileSrc } from "./art";

export function CassetteTile(props: { className?: string }) {
  return (
    <ArtTile
      id="cassette"
      from="#334155"
      to="#020617"
      letter="C"
      label="CASSETTE"
      {...props}
    />
  );
}

export const cassetteTileSrc = artTileSrc("#334155", "#020617", "C", "CASSETTE");
