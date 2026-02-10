import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import EnterEmailForm from "@src/components/forms/EnterEmailForm";

interface PasswordModalProps {
  handleSendLink?: any;
}

const PasswordResetModal = NiceModal.create<PasswordModalProps>(
  ({ handleSendLink }) => {
    const { visible, hide } = useModal();

    return (
      <PopUp
        title="Password Recovery"
        description="We'll send a password reset link to your email."
        open={visible}
        onClose={hide}
        children={<EnterEmailForm />}
        buttons={[
          {
            label: "Cancel",
            color: "primary",
            variant: "outlined",
            onClick: hide,
            buttonSx: { width: "150px" },
          },
          {
            label: "Send Link",
            color: "primary",
            onClick: handleSendLink,
            buttonSx: { width: "150px" },
          },
        ]}
      />
    );
  },
);

export default PasswordResetModal;
