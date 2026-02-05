import NiceModal, { useModal } from "@ebay/nice-modal-react";
import PopUp from "../PopUp/PopUp";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { deleteTask } from "@src/services/jobs";
import { QKEY_TASKS } from "@src/services/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@src/store/userStore";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";

interface DeleteCardModalProps {
  jobId: string;
}

const DeleteCardModal = NiceModal.create<DeleteCardModalProps>(({ jobId }) => {
  const { visible, hide } = useModal();
  const session = useUserStore((state) => state.session);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useSupabaseMutation(() => deleteTask(jobId), {
    onSuccess: () => {
      hide();
      showToast(TOAST_TYPE.SUCCESS, "Job deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [QKEY_TASKS, session?.user?.id],
      });
    },
    onError: (error) => {
      showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
    },
  });

  const handleCardDelete = () => {
    mutate();
  };

  return (
    <PopUp
      description="Are you sure you want to delete?"
      open={visible}
      onClose={isPending ? undefined : hide}
      showCloseButton={!isPending}
      buttons={[
        {
          label: "Cancel",
          color: "primary",
          variant: "outlined",
          onClick: hide,
          disabled: isPending,
          buttonSx: { width: "150px" },
        },
        {
          label: "Delete",
          color: "primary",
          onClick: handleCardDelete,
          loading: isPending,
          loadingPosition: "start",
          disabled: isPending,
          buttonSx: { width: "150px" },
        },
      ]}
    />
  );
});

export default DeleteCardModal;
