import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";

import PopUp from "../PopUp/PopUp";
import AddJobForm from "@src/components/forms/AddJobForm";
import type { Task } from "@src/types/commonTypes";
import { createJob, updateJob } from "@src/services/jobs";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";

export interface AddJobModalProps {
  handleJobSubmit?: any;
  initialTask?: Task;
}

const AddJobModal = NiceModal.create<AddJobModalProps>(({ initialTask }) => {
  const { visible, hide } = useModal();
  const queryClient = useQueryClient();
  const isEditMode = !!initialTask;

  const { isPending, mutate } = useSupabaseMutation(
    (vars: { values: Task; userId: string; taskId?: string }) => {
      if (vars.taskId) {
        return updateJob(vars.taskId, vars.values);
      }
      return createJob(vars.values, vars.userId);
    },
    {
      onSuccess: async (_data, _vars) => {
        hide();
        showToast(
          TOAST_TYPE.SUCCESS,
          isEditMode ? "Job updated successfully" : "Job saved successfully"
        );
        await queryClient.invalidateQueries({
          queryKey: ["tasks", _vars.userId],
        });
      },
      onError: (error, _vars) => {
        console.log(error);
        showToast(TOAST_TYPE.ERROR, `Error: ${error.message}`);
      },
    }
  );

  const handleJobSubmit = async (values: Task, userId: string) => {
    mutate({ values, userId, taskId: initialTask?.id });
  };
  return (
    <PopUp
      open={visible}
      onClose={isPending ? undefined : hide}
      showCloseButton={!isPending}
      children={
        <AddJobForm onSubmit={handleJobSubmit} initialTask={initialTask} />
      }
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
          label: isEditMode ? "Update" : "Add",
          color: "primary",
          onClick: () => {},
          type: "submit",
          form: "add-job-form",
          buttonSx: { width: "150px" },
          loading: isPending,
          loadingPosition: "start",
        },
      ]}
    />
  );
});

export default AddJobModal;
