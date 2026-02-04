import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

interface DeleteCardModalProps {
  jobId: string;
}

const DeleteCardModal = NiceModal.create<DeleteCardModalProps>(({ jobId }) => {
  const { visible, hide } = useModal();
  const handleCardDelete = () => {
    console.log(jobId);
  };

  return (
    <PopUp
      description="Are you sure you want to delete?"
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
          label: "Delete",
          color: "primary",
          onClick: handleCardDelete,
          buttonSx: { width: "150px" },
        },
      ]}
    />
  );
});

export default DeleteCardModal;
