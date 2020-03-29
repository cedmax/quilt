import React, { useState, memo, useCallback } from "react";
import { Panel, Layout } from "./components/styled";
import Size from "./components/Size";
import AvailableTiles from "./components/AvailableTiles";
import Body from "./components/Body";
import { ROWS, COLS } from "./constants";
import availableTiles from "./tiles";

export default memo(() => {
  const [width, updateWidth] = useState(COLS);
  const [height, updateHeight] = useState(ROWS);
  const [isFit, setFit] = useState(true);
  const [tileList, setTileList] = useState([...availableTiles]);
  const [selected, setSelected] = useState({});

  const selectTile = useCallback(
    tile => {
      setSelected(tile);
    },
    [setSelected]
  );

  const reduceQty = useCallback(tile => {
    let done = false;
    setTileList(state => {
      if (!done) {
        const tileList = [...state];
        const currIdx = tileList.findIndex(({ background }) => tile.background === background);
        if (tileList[currIdx]) {
          tileList[currIdx].qty = tileList[currIdx].qty - 1;
        }
        done = true;
        return [...tileList];
      } else {
        return [...state];
      }
    });
  }, []);

  const increaseQty = useCallback(bk => {
    let done = false;
    setTileList(state => {
      if (!done) {
        const tileList = [...state];
        const currIdx = tileList.findIndex(({ background }) => bk === background);
        if (tileList[currIdx]) {
          tileList[currIdx].qty = tileList[currIdx].qty + 1;
        }
        done = true;
        return [...tileList];
      } else {
        return [...state];
      }
    });
  }, []);

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
