import NiceModal from "@ebay/nice-modal-react";
import { Divider } from "@mui/material";
import MainButton from "@src/components/general/Button";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { DELETE_ACCOUNT_MODAL, SUCCESS_MODAL } from "@src/modals/modal_names";
import { deleteUser } from "@src/services/deleteUser";
import { useNavigate } from "react-router";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useSupabaseMutation(deleteUser, {
    onSuccess: () => {
      NiceModal.hide(DELETE_ACCOUNT_MODAL);
      NiceModal.show(SUCCESS_MODAL, {
        title: "Account deleted",
        description: "Redirecting to login page in seconds...",
        isRedirecting: true,
        onNavigate: () => navigate("/"),
      });
    },
    onError: (error: Error) => {
      showToast(TOAST_TYPE.ERROR, error.message);
    },
  });

  const handleDeleteAccount = () => {
    mutate();
  };

  const handleOpenDeleteAccountModal = () => {
    NiceModal.show(DELETE_ACCOUNT_MODAL, {
      handleDeleteAccount,
      isPending,
    });
  };
  return (
    <>
      <Divider sx={{ mt: 4 }} />
      <MainButton
        title="delete account"
        variant="contained"
        sx={{ backgroundColor: "error.main", width: "200px", my: 5 }}
        onClick={handleOpenDeleteAccountModal}
      />
    </>
  );
};

export default DeleteAccount;
