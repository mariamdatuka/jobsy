import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import EnterEmailForm from "@src/components/forms/EnterEmailForm";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { resetPasswordLink } from "@src/services/passwortResetLink";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
import { useEffect } from "react";
import { supabase } from "@src/supabase-client";

interface PasswordModalProps {
  handleSendLink?: any;
}

const PasswordResetModal = NiceModal.create<PasswordModalProps>(() => {
  const { visible, hide } = useModal();

  const { isPending, mutate, isSuccess, reset } = useSupabaseMutation(
    resetPasswordLink,
    {
      onError: (error, _vars) => {
        showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
      },
    },
  );

  const handleSubmit = (data: any) => {
    mutate(data.email);
  };

  const handleModalClose = () => {
    reset();
    hide();
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        handleModalClose();
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const content = isSuccess
    ? "If an account with this email exists, we have sent a password reset link. Please check your inbox."
    : "We'll send a password reset link to your email.";

  return (
    <PopUp
      description={content}
      iconType={isSuccess ? "success" : undefined}
      open={visible}
      onClose={isPending ? undefined : handleModalClose}
      children={
        isSuccess ? undefined : (
          <EnterEmailForm onSubmitCallback={handleSubmit} />
        )
      }
      showActionSection={isSuccess ? false : true}
      buttons={[
        {
          label: "Cancel",
          color: "primary",
          variant: "outlined",
          onClick: handleModalClose,
          buttonSx: { width: "150px" },
          disabled: isPending,
        },
        {
          label: "Send Link",
          form: "send-password-link-form",
          type: "submit",
          color: "primary",
          onClick: () => {},
          loading: isPending,
          loadingPosition: "start",
          disabled: isPending,
          buttonSx: { width: "150px" },
        },
      ]}
    />
  );
});

export default PasswordResetModal;
