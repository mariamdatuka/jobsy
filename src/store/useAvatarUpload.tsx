import { create } from "zustand";

interface AvatarUploadState {
  previewUrl: string | null;
  setPreview: (file: File) => void;
  clearPreview: () => void;
}

export const useAvatarStore = create<AvatarUploadState>((set) => ({
  previewUrl: null,
  setPreview: (file: File) => {
    const url = URL.createObjectURL(file);
    set({ previewUrl: url });
  },
  clearPreview: () => {
    set({ previewUrl: null });
  },
}));
