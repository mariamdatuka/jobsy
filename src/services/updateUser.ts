import { supabase } from "@src/supabase-client";

type UpdateUserProfileParams = {
  userId: string;
  currentEmail: string;
  email: string;
  firstName: string;
  lastName: string;
};

export const updateUserProfile = async (userData: UpdateUserProfileParams) => {
  // Normalize values
  const normalizedEmail = userData.email.trim();
  const normalizedFirstName = userData.firstName.trim();
  const normalizedLastName = userData.lastName.trim();

  // 1 Update Auth (only if email changed)
  if (normalizedEmail !== userData.currentEmail) {
    const { error: authError } = await supabase.auth.updateUser(
      {
        email: normalizedEmail,
        data: {
          first_name: normalizedFirstName,
          last_name: normalizedLastName,
        },
      },
      // {
      //   emailRedirectTo: "http://localhost:5173",
      // },
    );

    if (authError) throw authError;
  } else {
    // If email didn't change, still update metadata
    const { error: metaError } = await supabase.auth.updateUser({
      data: {
        first_name: normalizedFirstName,
        last_name: normalizedLastName,
      },
    });

    if (metaError) throw metaError;
  }

  //  Update public.users table
  const { data, error: dbError } = await supabase
    .from("users")
    .update({
      first_name: normalizedFirstName,
      last_name: normalizedLastName,
      //   updated_at: new Date(),
    })
    .eq("id", userData.userId)
    .select()
    .single();

  if (dbError) throw dbError;

  return data;
};
