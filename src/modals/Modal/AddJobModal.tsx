import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";

import PopUp from "../PopUp/PopUp";
import AddJobForm from "@src/components/forms/AddJobForm";
import type { Task } from "@src/types/commonTypes";
import { createJob } from "@src/services/jobs";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";

export interface AddJobModalProps {
  handleJobSubmit?: any;
}

const AddJobModal = NiceModal.create<AddJobModalProps>(() => {
  const { visible, hide } = useModal();
  const queryClient = useQueryClient();

  // mutation expects a single variables object { values, userId }
  const { isPending, isSuccess, isError, mutate } = useSupabaseMutation(
    (vars: { values: Task; userId: string }) => {
      return createJob(vars.values, vars.userId);
    },
    {
      onSuccess: (_data, vars) => {
        // invalidate tasks for this user so Kanban/Table refetch
        // queryClient.invalidateQueries(["tasks", vars.userId]);
        hide();
      },
    }
  );

  const handleJobSubmit = async (values: Task, userId: string) => {
    mutate({ values, userId });
  };
  return (
    <PopUp
      open={visible}
      onClose={isPending ? undefined : hide}
      children={<AddJobForm onSubmit={handleJobSubmit} />}
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
          label: "Add",
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
