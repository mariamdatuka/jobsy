import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { logout } from "@src/services/logout";
import { useFiltersStore } from "@src/store/useFiltersStore";

interface LogoutModalProps {
  onNavigate: any;
}

const LogoutModal = NiceModal.create<LogoutModalProps>(({ onNavigate }) => {
  const { visible, hide } = useModal();
  const resetFilters = useFiltersStore((state) => state.resetFilters);
  const { mutate, isPending } = useSupabaseMutation(logout, {
    onSuccess: () => {
      resetFilters();
      hide();
      onNavigate();
    },
  });
  const handleLogout = () => {
    mutate();
  };

  return (
    <PopUp
      title="Logout"
      description="Are you sure you want to logout?"
      open={visible}
      onClose={isPending ? undefined : hide}
      buttons={[
        {
          label: "Cancel",
          color: "primary",
          variant: "outlined",
          disabled: isPending,
          onClick: hide,
          buttonSx: { width: "150px" },
        },
        {
          label: "Logout",
          color: "primary",
          onClick: handleLogout,
          loading: isPending,
          loadingPosition: "start",
          disabled: isPending,
          buttonSx: { width: "150px" },
        },
      ]}
    />
  );
});

export default LogoutModal;
