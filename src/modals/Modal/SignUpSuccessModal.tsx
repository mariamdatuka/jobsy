import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
import { resendEmailConfirmationLink } from "@src/services/createUser";

interface SignUpSuccessModalProps {
  onNavigate: () => void;
  email?: string;
  networkUncertain?: boolean;
  onReset?: () => void;
}

const SignUpSuccessModal = NiceModal.create<SignUpSuccessModalProps>(
  ({ onNavigate, networkUncertain = false, email, onReset }) => {
    const { visible, hide } = useModal();

    const handleNavigate = () => {
      hide();
      onNavigate();
    };

    const { mutate, isPending } = useSupabaseMutation(
      resendEmailConfirmationLink,
      {
        onSuccess: () => {
          if (onReset) {
            onReset();
          }
          hide();
          showToast(
            TOAST_TYPE.SUCCESS,
            "If your account was created, a confirmation email will be sent shortly",
          );
        },
        onError: () => {
          showToast(
            TOAST_TYPE.ERROR,
            "Error sending confirmation link, try again!",
          );
        },
      },
    );

    const handleResendLink = () => {
      if (!email) return;
      mutate(email);
    };

    const content = networkUncertain
      ? "If the signup was successful, you will receive a confirmation email shortly.If you don’t receive it, you can resend the confirmation."
      : "if account with this email does not already exist, you will receive a link to confirm your email";

    const headline = networkUncertain
      ? "Ups, check your connection"
      : "Congtratulations!";

    return (
      <PopUp
        title={headline}
        description={content}
        open={visible}
        onClose={hide}
        iconType={networkUncertain ? "error" : "success"}
        buttons={[
          {
            label: networkUncertain ? "resend" : "Login",
            color: "primary",
            onClick: networkUncertain ? handleResendLink : handleNavigate,
            buttonSx: { width: "100%" },
            disabled: isPending,
          },
        ]}
      />
    );
  },
);

export default SignUpSuccessModal;
