import React, { memo } from "react";
import { Tile, TilesList } from "./styled";

export default memo(({ tiles, selectTile, selected }) => {
  return (
    <TilesList>
      {tiles.map((tile, i) => (
        <Tile
          selected={selected.background === tile.background}
          onClick={() => selectTile(tile)}
          key={i}
          size={35}
          count
          data-available={`${tile.qty}`}
          disabled={tile.qty === 0}
          style={{ background: tile.background }}
        ></Tile>
      ))}

      {/* <Tile size={35} add style={{ background: "#ccc" }} /> */}
    </TilesList>
  );
});
