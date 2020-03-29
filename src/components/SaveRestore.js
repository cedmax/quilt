import React, { memo } from "react";
import { SaveRestoreWrapper, SaveRestoreBtn } from "./styled";

export default memo(() => {
  return (
    <SaveRestoreWrapper>
      <SaveRestoreBtn onClick={() => console.log("download")}></SaveRestoreBtn>
      <SaveRestoreBtn onClick={() => console.log("restore")}></SaveRestoreBtn>
    </SaveRestoreWrapper>
  );
});
