import React, { memo, useCallback, useEffect } from "react";
import createPersistedState from "use-persisted-state";
import { Panel, Layout } from "./components/styled";
import Actions from "./components/Actions";
import Size from "./components/Size";
import AvailableTiles from "./components/AvailableTiles";
import Body from "./components/Body";
import { ROWS, COLS } from "./constants";
import getTiles from "./tiles";
import getLocalState from "./localstorage";

const useTilesAvailableState = createPersistedState("tiles");
const useStateWidth = createPersistedState("width");
const useStateHeight = createPersistedState("height");
const useMatrixState = createPersistedState("matrix");
const useIsFit = createPersistedState("is-fit");
const useSelected = createPersistedState("selected");

const calcMatrix = (matrix, width, height) => {
  const stuff = [...new Array(height)].map((row, r) => {
    if (matrix[r]) {
      return [...new Array(width)].map((col, c) => {
        return matrix[r][c] || "";
      });
    } else {
      return [...new Array(width)].map(col => "");
    }
  });
  return stuff;
};

const updateMatrix = (r, c, bk) => matrix => {
  matrix = [...matrix];
  matrix[r][c] = bk;
  return matrix;
};

const decrease = item => ({
  ...item,
  qty: item.qty - 1
});

const increase = item => ({
  ...item,
  qty: item.qty + 1
});

export default memo(() => {
  const [isFit, setFit] = useIsFit(() => getLocalState("is-fit", true));
  const [width, updateWidth] = useStateWidth(() => getLocalState("width", COLS));
  const [height, updateHeight] = useStateHeight(() => getLocalState("height", ROWS));
  const [tileList, setTileList] = useTilesAvailableState(() => getLocalState("tiles", getTiles()));
  const [matrix, setMatrix] = useMatrixState(() => getLocalState("matrix", calcMatrix(width, height)));
  const [selected, setSelected] = useSelected(() => getLocalState("selected", 0));

  const onReset = useCallback(() => {
    updateWidth(COLS);
    updateHeight(ROWS);
    setFit(true);
    setTileList(getTiles());
    setMatrix(calcMatrix([], COLS, ROWS));
    setSelected(0);
  }, [setFit, setMatrix, setSelected, setTileList, updateHeight, updateWidth]);

  const onRestore = useCallback(
    data => {
      updateWidth(data.width);
      updateHeight(data.height);
      setFit(data.isFit);
      setTileList(data.tileList);
      setMatrix(data.matrix);
      setSelected(data.selected);
    },
    [setFit, setMatrix, setSelected, setTileList, updateHeight, updateWidth]
  );

  useEffect(() => {
    setMatrix(matrix => calcMatrix(matrix, width, height));
  }, [width, height, setMatrix]);

  const selectTile = useCallback(
    tile => {
      const idx = tileList.findIndex(item => item.background === tile.background);
      setSelected(idx);
    },
    [setSelected, tileList]
  );

  const handleQty = useCallback(
    (r, c, tile, prevBk) => {
      setMatrix(updateMatrix(r, c, tile.background || ""));
      setTileList(state =>
        state.map(item => {
          let retItem = item;
          if (prevBk === item.background || prevBk === item.retro) {
            retItem = increase(retItem);
          }
          if (tile.background === item.background || tile.background === item.retro) {
            retItem = decrease(retItem);
          }
          return retItem;
        })
      );
    },
    [setTileList, setMatrix]
  );

  return (
    <Layout>
      <Panel>
        <h2>Config</h2>
        <Actions
          stateToSave={{
            isFit,
            width,
            height,
            tileList,
            matrix,
            selected
          }}
          onRestore={onRestore}
          onReset={onReset}
        />
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
        selected={tileList[selected]}
        onSelect={handleQty}
        isFit={isFit}
        width={width}
        height={height}
      />
    </Layout>
  );
});
