import { Avatar, Divider, Stack } from "@mui/material";
import MainButton from "@src/components/general/Button";

const UploadAvatar = () => {
  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        p={3}
      >
        <Avatar sx={{ width: 60, height: 60 }} />
        <Stack direction="row" gap={3}>
          <MainButton title="upload picture" variant="outlined" />
          <MainButton title="delete" variant="text" />
        </Stack>
      </Stack>
      <Divider />
    </>
  );
};

export default UploadAvatar;
