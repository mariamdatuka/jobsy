import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@src/supabase-client";

import { useSupabaseMutation } from "./useSupabaseMutation";
import { QKEY_USERS } from "@src/services/queryKeys";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";

function getStoragePathFromUrl(url?: string | null) {
  if (!url) return null;

  const base = "/storage/v1/object/public/";
  const index = url.indexOf(base);

  if (index === -1) return null;

  return url.substring(index + base.length).split("?")[0];
}

export const useAvatarDelete = (userId: string, avatarUrl?: string) => {
  const queryClient = useQueryClient();

  const deleteAvatarMutation = useSupabaseMutation(
    async () => {
      if (!avatarUrl) return;

      const filePath = getStoragePathFromUrl(avatarUrl);

      if (filePath) {
        const { error } = await supabase.storage
          .from("Avatars")
          .remove([filePath]);

        if (error) {
          throw error;
        }
      }

      const { error } = await supabase
        .from("users")
        .update({ avatar_url: null })
        .eq("id", userId);

      if (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        showToast(TOAST_TYPE.SUCCESS, "Avatar deleted successfully!");
        queryClient.invalidateQueries({
          queryKey: [QKEY_USERS, userId],
        });
      },
      onError: () => {
        showToast(TOAST_TYPE.ERROR, "Error deleting avatar, try again!");
      },
    },
  );

  return {
    deleteAvatar: () => deleteAvatarMutation.mutate(),
    isDeleting: deleteAvatarMutation.isPending,
  };
};
