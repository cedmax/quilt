import React, { useState, memo, useCallback, useEffect } from "react";
import createPersistedState from "use-persisted-state";
import { Panel, Layout } from "./components/styled";
import Size from "./components/Size";
import AvailableTiles from "./components/AvailableTiles";
import Body from "./components/Body";
import { ROWS, COLS } from "./constants";
import availableTiles from "./tiles";
import getLocalState from "./localstorage";

const useTilesAvailableState = createPersistedState("tiles");
const useStateWidth = createPersistedState("width");
const useStateHeight = createPersistedState("height");
const useMatrixState = createPersistedState("matrix");

const calcMatrix = (width, height) => {
  return [...new Array(height)].map(row => [...new Array(width)].map(i => ""));
};

const updateMatrix = (r, c, bk) => matrix => {
  matrix = [...matrix];
  matrix[r][c] = bk;
  return matrix;
};

export default memo(() => {
  const [width, updateWidth] = useStateWidth(() => getLocalState("width", COLS));
  const [height, updateHeight] = useStateHeight(() => getLocalState("width", ROWS));
  const [isFit, setFit] = useState(true);
  const [tileList, setTileList] = useTilesAvailableState(() => getLocalState("tiles", [...availableTiles]));
  const [matrix, setMatrix] = useMatrixState(() => getLocalState("matrix", calcMatrix(width, height)));
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setMatrix(() => getLocalState("matrix", calcMatrix(width, height)));
  }, [width, height, setMatrix]);

  const selectTile = useCallback(
    tile => {
      setSelected(tile);
    },
    [setSelected]
  );

  const reduceQty = useCallback(
    (r, c, tile) => {
      let done = false;
      setMatrix(updateMatrix(r, c, tile.background || ""));

      setTileList(state => {
        if (!done) {
          const tileList = [...state];
          const currIdx = tileList.findIndex(({ background }) => tile.background === background);

          if (tileList[currIdx]) {
            tileList[currIdx].qty = tileList[currIdx].qty - 1;

            const { retro } = tileList[currIdx];
            if (retro) {
              const retroIdx = tileList.findIndex(({ background }) => background === retro);
              console.log(retro, retroIdx);
              tileList[retroIdx].qty = tileList[retroIdx].qty - 1;
            }
          }
          done = true;
          return [...tileList];
        } else {
          return [...state];
        }
      });
    },
    [setTileList, setMatrix]
  );

  const increaseQty = useCallback(
    bk => {
      let done = false;
      setTileList(state => {
        if (!done) {
          const tileList = [...state];
          const currIdx = tileList.findIndex(({ background }) => bk === background);
          if (tileList[currIdx]) {
            tileList[currIdx].qty = tileList[currIdx].qty + 1;

            const { retro } = tileList[currIdx];
            if (retro) {
              const retroIdx = tileList.findIndex(({ background }) => background === retro);
              console.log(retro, retroIdx);
              tileList[retroIdx].qty = tileList[retroIdx].qty + 1;
            }
          }
          done = true;
          return [...tileList];
        } else {
          return [...state];
        }
      });
    },
    [setTileList]
  );

  return (
    <Layout>
      <Panel>
        <h2>Config</h2>
        <h3>Size</h3>
        <Size
          isFit={isFit}
          setFit={setFit}
          height={height}
          width={width}
          updateWidth={updateWidth}
          updateHeight={updateHeight}
        />
        <h3>Tiles</h3>
        <AvailableTiles selectTile={selectTile} selected={selected} tiles={tileList} />
      </Panel>
      <Body
        matrix={matrix}
        setMatrix={setMatrix}
        onUnSelect={increaseQty}
        selected={selected}
        onSelect={reduceQty}
        isFit={isFit}
        width={width}
        height={height}
      />
    </Layout>
  );
});
