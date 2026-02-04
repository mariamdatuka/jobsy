import NiceModal from "@ebay/nice-modal-react";
import { ADD_JOB_MODAL, DELETE_JOB_MODAL } from "@src/modals/modal_names";
import type { Task } from "@src/types/commonTypes";
import { create } from "zustand";

interface JobActionsStore {
  jobsData: Task[];
  onDeleteJob: (jobId?: string) => void;
  onEditJob: (Task: Task) => void;
  setJobsData: (jobs: Task[] | ((prev: Task[]) => Task[])) => void;
}

export const useJobActionsStore = create<JobActionsStore>((set) => ({
  jobsData: [],
  setJobsData: (jobs) =>
    set((state) => ({
      jobsData: typeof jobs === "function" ? jobs(state.jobsData) : jobs,
    })),
  onEditJob: (task) => {
    NiceModal.show(ADD_JOB_MODAL, { initialTask: task });
  },
  onDeleteJob: (jobId) => {
    NiceModal.show(DELETE_JOB_MODAL, { jobId });
  },
}));
