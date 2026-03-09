import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import EnterEmailForm from "@src/components/forms/EnterEmailForm";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { resetPasswordLink } from "@src/services/passwortResetLink";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
import { supabase } from "@src/supabase-client";
import PasswordResetWithOTP from "@src/components/forms/PasswordResetWithOTP";

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

  // useEffect(() => {
  //   const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
  //     if (session) {
  //       handleModalClose();
  //     }
  //   });

  //   return () => {
  //     listener.subscription.unsubscribe();
  //   };
  // }, []);

  const content = isSuccess
    ? "Please check your inbox and enter one time password"
    : "We'll send one time password to your email";

  return (
    <PopUp
      description={content}
      iconType={isSuccess ? "success" : undefined}
      open={visible}
      onClose={isPending ? undefined : handleModalClose}
      children={
        !isSuccess ? (
          <PasswordResetWithOTP />
        ) : (
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
          label: "Send",
          form: !isSuccess ? "submit-new-password" : "send-otp",
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
