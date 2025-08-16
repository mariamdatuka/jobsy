import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

const SignUpSuccessModal = NiceModal.create(() => {
  const { visible, hide } = useModal();
  return (
    <PopUp
      title="Congratulations"
      description="check your email"
      open={visible}
      onClose={hide}
    />
  );
});

export default SignUpSuccessModal;
