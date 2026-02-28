import { Avatar, Divider, Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";
import { useSupabaseMutation } from "@src/hooks/useSupabaseMutation";
import { uploadImage } from "@src/services/uploadImage";
import { useAvatarStore } from "@src/store/useAvatarUpload";
import { useUserStore } from "@src/store/userStore";
import { supabase } from "@src/supabase-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

const UploadAvatar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
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
        console.log("hi");
        throw Error;
      }
      console.log("bla");
      return publicUrl;
    },
    {
      onSuccess: (publicUrl: string) => {
        if (previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreview(publicUrl);
        // queryClient.invalidateQueries({ queryKey: ["user", userId] });
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

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        p={3}
      >
        <Avatar sx={{ width: 60, height: 60 }} src={previewUrl ?? undefined} />
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
