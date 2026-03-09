import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import EnterEmailForm from "@src/components/forms/EnterEmailForm";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
import PasswordResetWithOTP from "@src/components/forms/PasswordResetWithOTP";
import { passwordResetOTP } from "@src/services/passwortResetOTP";
import { useResetPasswordWithOtp } from "@src/hooks/useResetPasswordWithOtp";
import { useState } from "react";

interface PasswordModalProps {
  handleSendLink?: any;
}

const PasswordResetModal = NiceModal.create<PasswordModalProps>(() => {
  const [email, setEmail] = useState("");
  const { visible, hide } = useModal();

  const { isPending: isConfirming } = useResetPasswordWithOtp();

  const { isPending, mutate, isSuccess, reset } = useSupabaseMutation(
    passwordResetOTP,
    {
      onError: (error, _vars) => {
        showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
      },
    },
  );

  const handleSubmit = (data: any) => {
    setEmail(data.email);
    mutate(data.email);
  };

  const handleModalClose = () => {
    reset();
    setEmail("");
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
    ? `Enter the code sent to ${email}`
    : "We'll send one time password to your email";

  return (
    <PopUp
      description={content}
      iconType={isSuccess ? "success" : undefined}
      open={visible}
      onClose={isPending || isConfirming ? undefined : handleModalClose}
      children={
        isSuccess ? (
          <PasswordResetWithOTP email={email} />
        ) : (
          <EnterEmailForm onSubmitCallback={handleSubmit} />
        )
      }
      buttons={[
        {
          label: "Cancel",
          color: "primary",
          variant: "outlined",
          onClick: handleModalClose,
          buttonSx: { width: "150px" },
          disabled: isPending || isConfirming,
        },
        {
          label: "Send",
          form: isSuccess ? "submit-new-password" : "send-otp",
          type: "submit",
          color: "primary",
          onClick: () => {},
          loading: isPending || isConfirming,
          loadingPosition: "start",
          disabled: isPending || isConfirming,
          buttonSx: { width: "150px" },
        },
      ]}
    />
  );
});

export default PasswordResetModal;
