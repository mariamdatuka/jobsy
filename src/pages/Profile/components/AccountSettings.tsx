import UploadAvatar from "./UploadAvatar";
import PersonalInfo from "./PersonalInfo";
import AppPreferences from "./AppPreferences";
import { useUserStore } from "@src/store/userStore";
import { getUserData } from "@src/services/getUserData";
import { useSupabaseQuery } from "@src/hooks/useSupabaseQuery";
import { QKEY_USERS } from "@src/services/queryKeys";
import ChangePassword from "./ChangePassword";

const AccountSettings = () => {
  const userId = useUserStore((state) => state.session!.user.id);
  const { data, isPending } = useSupabaseQuery([QKEY_USERS, userId], () =>
    getUserData(userId),
  );
  return (
    <>
      <UploadAvatar userInfo={data} isDataLoading={isPending} />
      <PersonalInfo userInfo={data} isDataLoading={isPending} />
      <ChangePassword />
      {/* <AppPreferences /> */}
    </>
  );
};

export default AccountSettings;
