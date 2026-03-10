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

const OTP_VALID_TIME = 1 * 60 * 1000;
type ResetStep = "email" | "otp";

const PasswordResetModal = NiceModal.create<PasswordModalProps>(() => {
  const [email, setEmail] = useState("");
  const [coolDown, setCoolDown] = useState(0);
  const [otpSentAt, setOtpSentAt] = useState<number | null>(null);
  const [step, setStep] = useState<ResetStep>("email");
  const { visible, hide } = useModal();

  const { isPending: isConfirming } = useResetPasswordWithOtp();

  const { isPending, mutate, isSuccess } = useSupabaseMutation(
    passwordResetOTP,
    {
      onSuccess: (_, email) => {
        setCoolDown(30);
        setEmail(email);
        setStep("otp");
        setOtpSentAt(Date.now());
      },
      onError: (error) => {
        showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
      },
    },
  );

  useEffect(() => {
    if (coolDown === 0) return;
    const timer = setTimeout(() => {
      setCoolDown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [coolDown]);

  const handleSubmit = (data: any) => {
    mutate(data.email);
  };

  useEffect(() => {
    if (!visible) return;

    if (otpSentAt && Date.now() - otpSentAt < OTP_VALID_TIME) {
      setStep("otp");
    } else {
      setStep("email");
    }
  }, [visible]);

  const handleResendOtp = () => {
    mutate(email, {
      onSuccess: () => {
        showToast(TOAST_TYPE.SUCCESS, "New code is sent to email");
      },
    });
    setCoolDown(30);
  };

  const handleModalClose = () => {
    hide();
  };

  const content =
    step === "otp"
      ? `Enter the code sent to ${email}`
      : "We'll send one time password to your email";

  return (
    <PopUp
      description={content}
      iconType={isSuccess ? "success" : undefined}
      open={visible}
      onClose={isPending || isConfirming ? undefined : handleModalClose}
      children={
        step === "otp" ? (
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
