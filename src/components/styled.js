import styled from "styled-components";

export const Panel = styled.aside`
  height: 100vh;
  padding: 0.5em 1.5em;
  width: 20%;
  min-width: 200px;
  background: WhiteSmoke;
  box-shadow: 3px 0px 10px DimGray;
  border-right: 1px solid Gray;
`;

export const Layout = styled.div`
  display: flex;
`;

const addStyle = styled.style`
  border: 1px dashed #ccc;
  background: none !important;
  position: relative;

  &::before {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    font-size: 120%;
    line-height: 1.5;
    content: "\uFE62";
    color: #ccc;
    font-weight: bold;
    cursor: pointer;
  }
`;

const selected = styled.style`
  border: 2px dashed #000;
`;

const disabled = styled.style`
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(100, 100, 100, 0.5);
  }
`;

const counter = styled.style`
  &::after {
    content: attr(data-available);
    font-size: 90%;
    position: absolute;
    font-weight: bold;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    width: 50%;
    height: 50%;
    bottom: 0;
    right: 0;
  }
`;

export const Tile = styled.div`
  cursor: pointer;
  position: relative;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border: 1px solid #ccc;
  background-size: cover !important;
  ${p => (p.add ? addStyle.componentStyle.rules : "")};
  ${p => (p.selected ? selected.componentStyle.rules : "")};
  ${p => (p.disabled ? disabled.componentStyle.rules : "")};
  ${p => (p.count ? counter.componentStyle.rules : "")}
`;

export const TilesList = styled.div`
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;

  ${Tile} {
    margin-bottom: 2px;
    margin-right: 2px;
  }
`;
