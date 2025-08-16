import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

interface SignUpSuccessModalProps {
  onNavigate: () => void;
}

const SignUpSuccessModal = NiceModal.create<SignUpSuccessModalProps>(
  ({ onNavigate }) => {
    const { visible, hide } = useModal();

    return (
      <PopUp
        title="Congratulations!"
        description="check your email to verify your account"
        open={visible}
        onClose={hide}
        buttons={[{ label: "Login", color: "primary", onClick: onNavigate }]}
      />
    );
  }
);

export default SignUpSuccessModal;
