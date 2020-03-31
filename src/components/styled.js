import styled from "styled-components";

export const Panel = styled.aside`
  height: 100vh;
  padding: 0.5em 1.5em;
  width: 24%;
  min-width: 200px;
  background: WhiteSmoke;
  box-shadow: 3px 0px 10px DimGray;
  border-right: 1px solid Gray;
  overflow: auto;
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
  cursor: ${p => (p.cursorDisabled ? "no-drop" : "pointer")};
  position: relative;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border: 1px solid #ccc;
  background-size: cover !important;
  ${p => (p.add ? addStyle.componentStyle.rules : "")};
  ${p => (p.selected ? selected.componentStyle.rules : "")};
  ${p => (p.count ? counter.componentStyle.rules : "")}
  ${p => (p.disabled ? disabled.componentStyle.rules : "")};
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

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 1em;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5em 1em;
  width: 30%;
  min-width: fit-content;
  cursor: pointer;
  text-decoration: none;
  color: black;
  font-size: 0.7rem;
  text-align: center;
  background: white;
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  font-size: 120%;
  padding: 5px;
  font-weight: bold;
  width: 35%;
`;

export const Block = styled.div`
  padding: 0 1em;
  display: flex;
  justify-content: ${p => (p.left ? "flex-start" : p.right ? "flex-end" : "space-between")};
  align-items: center;
  line-height: 1;
  margin-bottom: 20px;
  ${p => (p.left ? " > *:nth-child(n+2) {margin-left: .5em}" : "")}
`;
