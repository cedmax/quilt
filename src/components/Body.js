import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import getNodeDimensions from "get-node-dimensions";
import styled from "styled-components";
import { TILE_SIZE, WRAPPER_PADDING } from "../constants";
import Grid from "./Grid";
import { Tile, Button, ButtonWrapper } from "./styled";

const Wrapper = styled.div`
  padding: ${WRAPPER_PADDING}px 0 ${WRAPPER_PADDING / 2}px;
  margin-bottom: ${WRAPPER_PADDING / 2}px;
  height: calc(100vh - 60px);
  flex-grow: 1;
  overflow: auto;

  &.free {
    height: auto;
  }
`;

export default memo(({ width, height, isFit, selected, onSelect, matrix }) => {
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

  const save = useCallback(() => {
    document.body.classList.add("wait");
    wrapperRef.current.classList.add("free");

    html2canvas(wrapperRef.current).then(canvas => {
      canvas.id = "remove";
      document.body.appendChild(canvas);
      const link = document.createElement("a");
      link.download = "quilt.jpg";
      link.href = canvas.toDataURL("image/jpeg");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      wrapperRef.current.classList.remove("free");
      document.body.classList.remove("wait");
      document.getElementById("remove").remove();
    });
  }, [wrapperRef]);

  return (
    <div>
      <Wrapper ref={wrapperRef}>
        <Grid size={tileSize} height={height} width={width}>
          {({ size, key, r, c }) => {
            const currentTile = matrix[r] && matrix[r][c];

            const onClick = () => {
              if (selected.qty && selected.background !== currentTile) {
                return onSelect(r, c, selected, currentTile);
              }

              onSelect(r, c, {}, currentTile);
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
      <ButtonWrapper>
        <Button onClick={save}>Download Image</Button>
      </ButtonWrapper>
    </div>
  );
});
