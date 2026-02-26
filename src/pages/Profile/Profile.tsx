import useBreakpoints from "@src/hooks/useBreakpoints";
import AccountSettings from "./components/AccountSettings";
import { Stack } from "@mui/material";

const Profile = () => {
  const { isMediumOnly } = useBreakpoints();
  return (
    <Stack px={isMediumOnly ? 0 : 15} py={4}>
      <AccountSettings />
    </Stack>
  );
};

export default Profile;
