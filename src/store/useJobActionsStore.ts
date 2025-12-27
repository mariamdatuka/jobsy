import NiceModal from "@ebay/nice-modal-react";
import { ADD_JOB_MODAL } from "@src/modals/modal_names";
import type { Task } from "@src/types/commonTypes";
import { create } from "zustand";

interface JobActionsStore {
  onDeleteJob: (jobId: string) => void;
  onEditJob: (Task: Task) => void;
}

export const useJobActionsStore = create<JobActionsStore>((_) => ({
  onEditJob: (task) => {
    NiceModal.show(ADD_JOB_MODAL, { initialTask: task });
  },
  onDeleteJob: (jobId) => {
    console.log("Delete job", jobId);
  },
}));
