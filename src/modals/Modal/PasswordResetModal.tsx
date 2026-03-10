import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import EnterEmailForm from "@src/components/forms/EnterEmailForm";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
import PasswordResetWithOTP from "@src/components/forms/PasswordResetWithOTP";
import { passwordResetOTP } from "@src/services/passwortResetOTP";
import { useResetPasswordWithOtp } from "@src/hooks/useResetPasswordWithOtp";
import { useEffect, useState } from "react";

interface PasswordModalProps {
  handleSendLink?: any;
}

const PasswordResetModal = NiceModal.create<PasswordModalProps>(() => {
  const [email, setEmail] = useState("");
  const [coolDown, setCoolDown] = useState(30);
  const { visible, hide } = useModal();

  const { isPending: isConfirming } = useResetPasswordWithOtp();

  const { isPending, mutate, isSuccess } = useSupabaseMutation(
    passwordResetOTP,
    {
      onSuccess: (_, email) => {
        setCoolDown(120);
        setEmail(email);
      },
      onError: (error) => {
        showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
      },
    },
  );

  useEffect(() => {
    if (coolDown === 0) return;
    const timer = setTimeout(() => {
      console.log("tick");
      setCoolDown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [coolDown]);

  const handleSubmit = (data: any) => {
    mutate(data.email);
  };

  const handleResendOtp = () => {
    mutate(email);
    setCoolDown(120);
  };

  const handleModalClose = () => {
    hide();
  };

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
        !isSuccess ? (
          <PasswordResetWithOTP
            email={email}
            coolDown={coolDown}
            handleResendOtp={handleResendOtp}
          />
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
