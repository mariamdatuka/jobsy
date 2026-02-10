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

    const { isPending, mutate } = useSupabaseMutation(
      (vars: { values: any }) => {
        return resetPassword(vars.values);
      },
      {
        onSuccess: async (_data, _vars) => {
          hide();
          showToast(
            TOAST_TYPE.SUCCESS,
            "Password reset link sent successfully",
          );
        },
        onError: (error, _vars) => {
          showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
        },
      },
    );

    const handleSubmit = async (data: any) => {
      await mutate({ values: data.email });
    };

    return (
      <PopUp
        description="We'll send a password reset link to your email."
        open={visible}
        onClose={hide}
        children={<EnterEmailForm onSubmitCallback={handleSubmit} />}
        buttons={[
          {
            label: "Cancel",
            color: "primary",
            variant: "outlined",
            onClick: hide,
            buttonSx: { width: "150px" },
          },
          {
            label: "Send Link",
            form: "send-password-link-form",
            type: "submit",
            color: "primary",
            onClick: () => {},
            buttonSx: { width: "150px" },
          },
        ]}
      />
    );
  },
);

export default PasswordResetModal;
