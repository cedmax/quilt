import React, { memo, useCallback } from "react";
import Switch from "./Switch";
import { Input, Block } from "./styled";

const callback = update => value => update(parseInt(Math.min(value, 100) || 0, 10));

export default memo(({ isFit, setFit, height, width, updateWidth, updateHeight }) => {
  const setWidth = useCallback(e => callback(updateWidth)(e.target.value), [updateWidth]);
  const setHeight = useCallback(e => callback(updateHeight)(e.target.value), [updateHeight]);

  return (
    <>
      <Block>
        <Input type="number" value={width} onChange={setWidth} /> x
        <Input type="number" value={height} onChange={setHeight} />
      </Block>
      <Block left>
        <Switch checked={isFit} onChange={setFit} /> <span>Fit in screen?</span>
      </Block>
    </>
  );
});
