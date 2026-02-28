import { Avatar, Divider, Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";
import { useAvatarDelete } from "@src/hooks/useAvatarDelete";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { QKEY_USERS } from "@src/services/queryKeys";
import { uploadImage } from "@src/services/uploadImage";
import { useAvatarStore } from "@src/store/useAvatarUpload";
import { useUserStore } from "@src/store/userStore";
import { supabase } from "@src/supabase-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

interface UserInfo {
  email: string;
  avatar_url?: string;
  first_Name: string;
  last_Name: string;
}
interface UploadAvatarProps {
  userInfo: UserInfo;
}

const UploadAvatar = ({ userInfo }: UploadAvatarProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const userId = useUserStore((state) => state.session!.user.id);
  const setPreview = useAvatarStore((state) => state.setPreview);
  const previewUrl = useAvatarStore((state) => state.previewUrl);
  const clearPreview = useAvatarStore((state) => state.clearPreview);

  console.log(previewUrl, "preview");

  const uploadMutation = useSupabaseMutation<
    string,
    { file: File; userId: string }
  >(
    async ({ file, userId }) => {
      const publicUrl = await uploadImage(file, userId);

      const { error } = await supabase
        .from("users")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (error) {
        console.log(error);

        throw Error;
      }

      return publicUrl;
    },
    {
      onSuccess: (publicUrl) => {
        if (previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreview(publicUrl);
        queryClient.invalidateQueries({ queryKey: [QKEY_USERS, userId] });
      },
    },
  );

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    uploadMutation.mutate({ file, userId });
  };
  const avatarUrl = userInfo?.avatar_url;
  const { deleteAvatar } = useAvatarDelete(userId, avatarUrl);

  const handleAvatarDelete = () => {
    if (previewUrl && !avatarUrl) {
      clearPreview();
      return;
    }
    deleteAvatar();
  };

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        p={3}
      >
        <Avatar
          sx={{ width: 60, height: 60 }}
          src={previewUrl || avatarUrl || undefined}
        />
        <Stack direction="row" gap={3}>
          <MainButton
            title="upload picture"
            variant="outlined"
            onClick={handleOpenFileDialog}
          />
          {(previewUrl || avatarUrl) && (
            <MainButton
              title="delete"
              variant="text"
              onClick={handleAvatarDelete}
            />
          )}
        </Stack>
      </Stack>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
      <Divider />
    </>
  );
};

export default UploadAvatar;
