import { Avatar, CircularProgress, Divider, Stack, Box } from "@mui/material";
import MainButton from "@src/components/general/Button";
import { showToast, TOAST_TYPE } from "@src/helpers/showToast";
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
  first_name: string;
  last_name: string;
}
export interface UserDataProps {
  userInfo: UserInfo;
}

const UploadAvatar = ({ userInfo }: UserDataProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const userId = useUserStore((state) => state.session!.user.id);
  const setPreview = useAvatarStore((state) => state.setPreview);
  const previewUrl = useAvatarStore((state) => state.previewUrl);
  const clearPreview = useAvatarStore((state) => state.clearPreview);

  const { mutate, isPending: isUploading } = useSupabaseMutation<
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
        throw error;
      }

      return publicUrl;
    },
    {
      onSuccess: (publicUrl) => {
        showToast(TOAST_TYPE.SUCCESS, "Image uploaded successfull");
        if (previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreview(publicUrl);
        queryClient.invalidateQueries({ queryKey: [QKEY_USERS, userId] });
      },
      onError: () => {
        if (previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        showToast(TOAST_TYPE.ERROR, "Error uploading avatar, try again!");
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
    mutate({ file, userId });
  };
  const avatarUrl = userInfo?.avatar_url;
  const { deleteAvatar, isDeleting } = useAvatarDelete(userId, avatarUrl);

  const handleAvatarDelete = () => {
    if (previewUrl) {
      clearPreview();
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
        <Box
          sx={{
            position: "relative",
            width: 60,
            height: 60,
          }}
        >
          <Avatar
            src={previewUrl || avatarUrl || undefined}
            sx={{
              width: 60,
              height: 60,
              opacity: isUploading || isDeleting ? 0.75 : 1,
              transition: "opacity 0.2s ease",
            }}
          />
          {(isDeleting || isUploading) && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.5)",
                borderRadius: "50%",
              }}
            >
              <CircularProgress size={26} />
            </Box>
          )}
        </Box>
        <Stack direction="row" gap={3}>
          <MainButton
            title="upload picture"
            variant="outlined"
            onClick={handleOpenFileDialog}
            disabled={isDeleting || isUploading}
          />
          {avatarUrl && (
            <MainButton
              title="delete"
              variant="text"
              disabled={isDeleting}
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
