import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";

interface LogoutModalProps {
  handleLogout: any;
}

const LogoutModal = NiceModal.create<LogoutModalProps>(({ handleLogout }) => {
  const { visible, hide } = useModal();

  return (
    <PopUp
      title="Logout"
      description="Are you sure you want to logout?"
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
          label: "Logout",
          color: "primary",
          onClick: handleLogout,
          buttonSx: { width: "150px" },
        },
      ]}
    />
  );
});

export default LogoutModal;
