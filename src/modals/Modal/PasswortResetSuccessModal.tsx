import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

interface SuccessModalProps {
  onNavigate: () => void;
}

const PasswordResetSuccessModal = NiceModal.create<SuccessModalProps>(
  ({ onNavigate }) => {
    const { visible } = useModal();

    return (
      <PopUp
        title="Password updated successfully!"
        description="You can now log in with your new password."
        open={visible}
        onClose={undefined}
        showCloseButton={false}
        iconType="success"
        buttons={[
          {
            label: "Login",
            color: "primary",
            onClick: onNavigate,
            buttonSx: { width: "100%" },
          },
        ]}
      />
    );
  },
);

export default PasswordResetSuccessModal;
