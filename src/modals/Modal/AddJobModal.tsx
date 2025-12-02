import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

export interface AddJobModalProps {
  handleJobSubmit?: any;
}

const AddJobModal = NiceModal.create<AddJobModalProps>(
  ({ handleJobSubmit }) => {
    const { visible, hide } = useModal();

    return (
      <PopUp
        open={visible}
        onClose={hide}
        buttons={[
          {
            label: "Cancel",
            color: "primary",
            variant: "outlined",
            onClick: hide,
            buttonSx: { width: "150px" },
          },
          {
            label: "Add",
            color: "primary",
            onClick: handleJobSubmit,
            buttonSx: { width: "150px" },
          },
        ]}
      />
    );
  }
);

export default AddJobModal;
