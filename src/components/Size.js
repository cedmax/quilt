import React, { memo, useCallback } from "react";
import styled from "styled-components";
import Switch from "./Switch";

const Block = styled.div`
  padding: 0 1em;
  display: flex;
  justify-content: ${p => (p.left ? "flex-start" : "space-between")};
  align-items: center;
  line-height: 1;
  margin-bottom: 20px;
`;

const Copy = styled.span`
  margin-left: 0.5em;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  font-size: 120%;
  padding: 5px;
  font-weight: bold;
  width: 35%;
`;

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
        <Switch checked={isFit} onChange={setFit} /> <Copy>Fit in screen?</Copy>
      </Block>
    </>
  );
});
