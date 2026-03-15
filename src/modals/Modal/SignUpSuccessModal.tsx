import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

interface SignUpSuccessModalProps {
  onNavigate: () => void;
}

const SignUpSuccessModal = NiceModal.create<SignUpSuccessModalProps>(
  ({ onNavigate }) => {
    const { visible, hide } = useModal();

    const handleNavigate = () => {
      hide();
      onNavigate();
    };

    return (
      <PopUp
        title="Congratulations!"
        description="if account with this email does not already exist, you will receive a link to confirm your email"
        open={visible}
        onClose={hide}
        iconType="success"
        buttons={[
          {
            label: "Login",
            color: "primary",
            onClick: handleNavigate,
            buttonSx: { width: "100%" },
          },
        ]}
      />
    );
  },
);

export default SignUpSuccessModal;
