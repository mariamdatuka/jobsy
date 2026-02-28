import { Avatar, Divider, Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { uploadImage } from "@src/services/uploadImage";
import { useAvatarStore } from "@src/store/useAvatarUpload";
import { useUserStore } from "@src/store/userStore";
import { supabase } from "@src/supabase-client";

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

  const userId = useUserStore((state) => state.session!.user.id);

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
      onSuccess: (publicUrl: string) => {
        if (previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreview(publicUrl);
      },
    },
  );

  const setPreview = useAvatarStore((state) => state.setPreview);
  const previewUrl = useAvatarStore((state) => state.previewUrl);

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
          <MainButton title="delete" variant="text" />
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
