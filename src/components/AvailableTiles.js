import React, { memo, useCallback, useState, useEffect } from "react";
import Uploader from "./Uploader";
import Switch from "./Switch";
import { Tile, TilesList, Input, Button, Block } from "./styled";

export default memo(({ tiles, selectTile, selected, addTile }) => {
  const [pendingTile, setPendingTile] = useState(null);
  const [pendingRetroTile, setPendingRetroTile] = useState(null);
  const [pendingCount, setPendingCount] = useState(1);
  const [hasRetro, setHasRetro] = useState(false);

  const updatePendingCount = useCallback(e => {
    const value = parseInt(e.target.value, 10);
    setPendingCount(value < 0 ? 0 : value);
  }, []);

  const confirmTile = useCallback(() => {
    addTile(pendingTile, pendingCount, pendingRetroTile);
    setPendingTile(null);
    setPendingRetroTile(null);
    setPendingCount(1);
    setHasRetro(false);
  }, [pendingTile, addTile, pendingCount, pendingRetroTile]);

  const toggleHasRetro = useCallback(() => {
    setHasRetro(hasRetro => !hasRetro);
  }, []);

  useEffect(() => {
    if (pendingRetroTile) {
      setHasRetro(true);
    }
  }, [pendingRetroTile]);

  return (
    <>
      <TilesList>
        {tiles.map((tile, i) => (
          <Tile
            selected={i === selected}
            onClick={() => selectTile(tile)}
            key={i}
            size={35}
            count
            data-available={`${tile.qty}`}
            disabled={tile.qty === 0}
            style={{ background: tile.background }}
          ></Tile>
        ))}
        <Uploader addTile={setPendingTile}>
          {({ onOpen }) => <Tile onClick={onOpen} size={35} add style={{ background: "#ccc" }} />}
        </Uploader>
      </TilesList>
      {pendingTile && (
        <>
          <br />
          <br />
          <Block left>
            <Tile
              size={35}
              count
              data-available={`${pendingCount}`}
              style={{ background: `url('${pendingTile}')` }}
            ></Tile>
            {pendingRetroTile && (
              <Tile
                size={35}
                count
                data-available={`${pendingCount}`}
                style={{ background: `url('${pendingRetroTile}')` }}
              ></Tile>
            )}
            <Input value={pendingCount} onChange={updatePendingCount} type="number" />
          </Block>
          <Block left>
            <Uploader onClose={toggleHasRetro} addTile={setPendingRetroTile}>
              {({ onOpen }) => {
                const onChange = () => {
                  if (!hasRetro) {
                    onOpen();
                  } else {
                    setPendingRetroTile(null);
                  }
                  toggleHasRetro();
                };
                return (
                  <>
                    <Switch checked={hasRetro} onChange={onChange} /> <span>Has Retro?</span>
                  </>
                );
              }}
            </Uploader>
          </Block>

          <Block right>
            <Button onClick={confirmTile}>Ok</Button>
          </Block>
        </>
      )}
    </>
  );
});
