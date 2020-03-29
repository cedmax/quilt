import React, { memo, useCallback } from "react";
import { SaveRestoreWrapper, Button } from "./styled";

export default memo(({ onReset, onRestore, stateToSave }) => {
  const href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stateToSave));

  const onChange = useCallback(
    e => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = event => {
        const data = JSON.parse(event.target.result);
        onRestore(data);
      };

      reader.readAsText(file);
    },
    [onRestore]
  );

  return (
    <SaveRestoreWrapper>
      <Button onClick={onReset}>Reset</Button>
      <Button as="label" htmlFor="file">
        Restore
      </Button>
      <input value="" onChange={onChange} type="file" id="file" style={{ display: "none" }} />{" "}
      <Button as="a" download="quilt.json" href={href}>
        Save
      </Button>
    </SaveRestoreWrapper>
  );
});
