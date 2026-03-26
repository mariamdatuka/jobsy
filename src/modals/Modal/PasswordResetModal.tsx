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

const OTP_VALID_TIME = 3 * 60 * 1000;
type ResetStep = "email" | "otp";

const PasswordResetModal = NiceModal.create<PasswordModalProps>(() => {
  const [email, setEmail] = useState(
    () => localStorage.getItem("resetEmail") || "",
  );
  const [_, setOtpSentAt] = useState<number | null>(() => {
    const saved = localStorage.getItem("otpSentAt");
    return saved ? Number(saved) : null;
  });
  const [coolDown, setCoolDown] = useState<number>(() => {
    const saved = localStorage.getItem("coolDown");
    return saved ? Number(saved) : 0;
  });

  const [step, setStep] = useState<ResetStep>("email");
  const { visible, hide } = useModal();

  const { isPending: isConfirming } = useResetPasswordWithOtp();

  const { isPending, mutate, isSuccess } = useSupabaseMutation(
    passwordResetOTP,
    {
      onSuccess: (_, email) => {
        setCoolDown(180);
        setEmail(email);
        setStep("otp");
        const now = Date.now();
        setOtpSentAt(now);
        localStorage.setItem("resetEmail", email);
        localStorage.setItem("otpSentAt", String(now));
        localStorage.setItem("coolDown", String(180));
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

    const savedOtpSentAt = Number(localStorage.getItem("otpSentAt"));

    if (savedOtpSentAt && Date.now() - savedOtpSentAt < OTP_VALID_TIME) {
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
      // onError: (error) => {
      //   if (error?.status === 429) {
      //     showToast(
      //       TOAST_TYPE.ERROR,
      //       "Too many attempts. Please wait before requesting another code.",
      //     );
      //   }
      // },
    });
    setCoolDown(30);
  };

  const handleModalClose = () => {
    if (coolDown === 0) {
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("otpSentAt");
      localStorage.removeItem("coolDown");
    }

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
