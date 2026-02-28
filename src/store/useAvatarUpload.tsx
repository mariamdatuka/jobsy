import { create } from "zustand";

interface AvatarUploadState {
  previewUrl: string | null;
  setPreview: (url: string) => void;
  clearPreview: () => void;
}

export const useAvatarStore = create<AvatarUploadState>((set) => ({
  previewUrl: null,
  setPreview: (url: string) => {
    set({ previewUrl: url });
  },
  clearPreview: () => {
    set({ previewUrl: null });
  },
}));
