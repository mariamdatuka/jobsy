import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

interface ModalProps {
  handleDeleteAccount: any;
  isPending: boolean;
}

const DeleteAccountModal = NiceModal.create<ModalProps>(
  ({ handleDeleteAccount, isPending }) => {
    const { visible, hide } = useModal();

    return (
      <PopUp
        description="Are you sure you want to delete your account?"
        open={visible}
        onClose={isPending ? undefined : hide}
        showCloseButton={!isPending}
        buttons={[
          {
            label: "Cancel",
            color: "primary",
            variant: "outlined",
            onClick: hide,
            disabled: isPending,
            buttonSx: { width: "150px" },
          },
          {
            label: "Delete",
            color: "primary",
            onClick: handleDeleteAccount,
            buttonSx: { width: "150px" },
            loading: isPending,
            loadingPosition: "start",
            disabled: isPending,
          },
        ]}
      />
    );
  },
);

export default DeleteAccountModal;
