import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import { useEffect } from "react";
import { useNavigate } from "react-router";
interface Props {
  title?: string;
  description?: string;
  isRedirecting?: boolean;
}

const SuccessModal = NiceModal.create(
  ({ title, description, isRedirecting }: Props) => {
    const { visible, hide } = useModal();
    const navigate = useNavigate();
    useEffect(() => {
      if (!isRedirecting) {
        return;
      }
      const timer = setTimeout(() => {
        navigate("/");
      }, 4000);
      return () => clearTimeout(timer);
    }, []);

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
  },
);

export default SuccessModal;
