import { KebabMenu } from "@src/assets/icons/KebabMenu";
import CustomPopper from "@src/components/popper/CustomPopper";
import { useState } from "react";
import type React from "react";

const EditActions = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  return (
    <>
      <span onClick={handleClick} style={{ cursor: "pointer" }}>
        <KebabMenu />
      </span>
      <CustomPopper
        open={open}
        anchorEl={anchorEl}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

export default EditActions;
