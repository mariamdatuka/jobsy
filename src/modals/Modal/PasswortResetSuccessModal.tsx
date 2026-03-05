import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

const PasswordResetSuccessModal = NiceModal.create(() => {
  const { visible, hide } = useModal();

  return (
    <PopUp
      title="Password updated successfully!"
      description="You can now log in with your new password."
      open={visible}
      onClose={hide}
      showCloseButton={true}
      iconType="success"
      showActionSection={false}
    />
  );
});

export default PasswordResetSuccessModal;
