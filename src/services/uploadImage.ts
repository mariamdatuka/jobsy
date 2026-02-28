import { supabase } from "@src/supabase-client";

export const uploadImage = async (file: File, userId: string) => {
  const filePath = `${userId}/avatar.jpg`;

  const { data: URL, error } = await supabase.storage
    .from("Avatars")
    .upload(filePath, file, { upsert: true });

  console.log(URL);

  if (error) throw error;

  const { data } = supabase.storage.from("Avatars").getPublicUrl(filePath);

  return `${data.publicUrl}?t=${Date.now()}`;
};
