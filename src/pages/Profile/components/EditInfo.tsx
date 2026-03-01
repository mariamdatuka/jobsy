import { Stack } from "@mui/material";
import { Edit } from "@src/assets/icons/Edit";
import MainButton from "@src/components/general/Button";
import Text from "@src/components/general/Text";

const EditInfo = ({
  toggleEditMode,
  title,
}: {
  toggleEditMode: () => void;
  title: string;
}) => {
  return (
    <Stack direction="row" gap={2} my={6}>
      <Text variant="h5" fontWeight={600} color="secondary.main">
        {title}
      </Text>
      <MainButton
        title="Edit"
        variant="text"
        startIcon={<Edit />}
        onClick={toggleEditMode}
      />
    </Stack>
  );
};

export default EditInfo;
