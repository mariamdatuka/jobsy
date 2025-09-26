import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  open: boolean;
  toggleDrawer: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      open: false,
      toggleDrawer: () => set((state) => ({ open: !state.open })),
    }),
    {
      name: "sidebar-storage", // key for localStorage
    }
  )
);
