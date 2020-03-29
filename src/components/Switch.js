import React, { useCallback, memo } from "react";
import styled from "styled-components";
import { TOGGLE_ID } from "../constants";

const size = 19;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: ${size * 2}px;
  height: ${size}px;
  background: grey;
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s;

  span {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: ${size - 5}px;
    height: ${size - 5}px;
    border-radius: ${size - 5}px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  }

  &:active span {
    width: ${size + size / 5}px;
  }
`;

const Checkbox = styled.input`
  height: 0;
  width: 0;
  position: absolute;
  visibility: hidden;

  &:checked + ${Label} {
    background: green;
    span {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
  }
`;

export default memo(({ checked, onChange }) => {
  const updateField = useCallback(e => onChange(document.getElementById(TOGGLE_ID).checked), [onChange]);

  return (
    <div>
      <Checkbox checked={checked} onChange={updateField} id={TOGGLE_ID} type="checkbox" />
      <Label htmlFor={TOGGLE_ID}>
        <span />
      </Label>
    </div>
  );
});
