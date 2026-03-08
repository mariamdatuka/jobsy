import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
interface Props {
  title?: string;
  description?: string;
}

const SuccessModal = NiceModal.create(({ title, description }: Props) => {
  const { visible, hide } = useModal();

  const headline = title || "Password updated successfully!";
  const content = description || "You can now log in with your new password.";

  return (
    <PopUp
      title={headline}
      description={content}
      open={visible}
      onClose={hide}
      showCloseButton={true}
      iconType="success"
      showActionSection={false}
    />
  );
});

export default SuccessModal;
