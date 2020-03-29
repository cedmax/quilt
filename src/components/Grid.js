import React from "react";
import styled from "styled-components";
import { WRAPPER_PADDING } from "../constants";
import { Tile } from "./styled";

const Row = styled.div`
  padding: 0 ${WRAPPER_PADDING}px;
  display: flex;
  justify-content: center;
  min-width: ${p => p.items * (p.tileSize + 2) + WRAPPER_PADDING}px;
  margin-bottom: 2px;

  ${Tile} {
    margin-right: 2px;
  }
`;

export default ({ height, width, children, size }) => {
  const rows = [...new Array(height)];
  const cols = [...new Array(width)];

  return rows.map((r, i) => (
    <Row tileSize={size} key={i} items={width}>
      {cols.map((c, e) => children({ size, key: `${i}-${e}`, r: i, c: e }))}
    </Row>
  ));
};
