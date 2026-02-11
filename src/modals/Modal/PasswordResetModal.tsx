import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import EnterEmailForm from "@src/components/forms/EnterEmailForm";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { resetPassword } from "@src/services/passwortReset";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";

interface PasswordModalProps {
  handleSendLink?: any;
}

const PasswordResetModal = NiceModal.create<PasswordModalProps>(
  ({ handleSendLink }) => {
    const { visible, hide } = useModal();

    const { isPending, mutate, isSuccess } = useSupabaseMutation(
      (vars: { values: any }) => {
        return resetPassword(vars.values);
      },
      // {
      //   onSuccess: async (_data, _vars) => {
      //     // hide();
      //     showToast(
      //       TOAST_TYPE.SUCCESS,
      //       "Password reset link sent successfully, please check your email.",
      //     );
      //   },
      {
        onError: (error, _vars) => {
          showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
        },
      },
    );

    const handleSubmit = (data: any) => {
      mutate({ values: data.email });
    };

    const content = isSuccess
      ? "Password reset link sent successfully, please check your email."
      : "We'll send a password reset link to your email.";

    return (
      <PopUp
        description={content}
        iconType={isSuccess ? "success" : undefined}
        open={visible}
        onClose={isPending ? undefined : hide}
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
            onClick: hide,
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
  },
);

export default PasswordResetModal;
