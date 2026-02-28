import { supabase } from "@src/supabase-client";

export const uploadImage = async (file: File, userId: string) => {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("Avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    console.log("error", error);
    throw error;
  }

  const { data } = supabase.storage.from("Avatars").getPublicUrl(filePath);

  return data.publicUrl;
};
