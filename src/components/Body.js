import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import getNodeDimensions from "get-node-dimensions";
import styled from "styled-components";
import { TILE_SIZE, WRAPPER_PADDING } from "../constants";
import Grid from "./Grid";
import { Tile } from "./styled";

const Wrapper = styled.div`
  padding: ${WRAPPER_PADDING}px 0;
  height: 100vh;
  flex-grow: 1;
  overflow: auto;
`;

export default memo(({ width, height, isFit, selected, onSelect, onUnSelect, matrix, setMatrix }) => {
  const [tileSize, setTileSize] = useState(TILE_SIZE);
  const wrapperRef = useRef();

  useEffect(() => {
    const resize = () => {
      if (isFit && wrapperRef.current) {
        const { width: wrapperWidth, height: wrapperHeight } = getNodeDimensions(wrapperRef.current);
        const tileWidth = (wrapperWidth - WRAPPER_PADDING * 2 - 2 * width) / width;
        const tileHeight = (wrapperHeight - WRAPPER_PADDING * 2 - 2 * height) / height;
        setTileSize(Math.min(tileWidth, tileHeight, TILE_SIZE));
      } else {
        setTileSize(TILE_SIZE);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, [isFit, width, height]);

  const setBk = useCallback(
    (r, c, selected) => {
      onSelect(r, c, selected);
    },
    [onSelect]
  );

  return (
    <Wrapper ref={wrapperRef}>
      <Grid size={tileSize} height={height} width={width}>
        {({ size, key, r, c }) => {
          const currentTile = matrix[r] && matrix[r][c];
          const onClick = () => {
            if (currentTile) {
              onUnSelect(currentTile);
            }

            if (selected && selected.background !== currentTile) {
              selected.qty && setBk(r, c, selected);
            } else {
              setBk(r, c, {});
            }
          };

          return (
            <Tile
              onClick={onClick}
              style={{
                background: currentTile || "#ccc"
              }}
              cursorDisabled={selected.qty === 0 || !selected.background}
              key={key}
              size={size}
              color="#ccc"
            />
          );
        }}
      </Grid>
    </Wrapper>
  );
});
