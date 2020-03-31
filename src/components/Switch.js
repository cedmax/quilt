import React, { useCallback, memo, useRef } from "react";
import styled from "styled-components";

const size = 19;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: ${size * 2}px;
  height: ${size}px;
  background: ${p => (p.checked ? "green" : "grey")};
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s;

  span {
    content: "";
    position: absolute;
    top: 2px;
    left: ${p => (p.checked ? `calc(100% - 2px)` : `2px`)};
    transform: ${p => (p.checked ? "translateX(-100%);" : "none")};
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
`;

export default memo(({ checked, onChange }) => {
  const checkboxRef = useRef();
  const updateField = useCallback(e => onChange(checkboxRef.current.checked), [onChange, checkboxRef]);

  return (
    <Label checked={checked}>
      <Checkbox checked={checked} onChange={updateField} ref={checkboxRef} type="checkbox" />
      <span />
    </Label>
  );
});
