import { KebabMenu } from "@src/assets/icons/KebabMenu";
import CustomPopper from "@src/components/popper/CustomPopper";
import { useState } from "react";
import type React from "react";
import type { Task } from "@src/types/commonTypes";

const EditActions = ({
  handleJobActionsClick,
  task,
}: {
  handleJobActionsClick?: (action: string, task: Task) => void;
  task: Task;
}) => {
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
        handleJobActionsClick={(action) =>
          handleJobActionsClick?.(action, task)
        }
      />
    </>
  );
};

export default EditActions;
