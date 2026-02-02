import { Stack } from "@mui/material";
import Emptystate from "@src/assets/icons/EmptyState.svg";
import Text from "./Text";
import MainButton from "./Button";

interface Props {
  searchTerm?: string;
  message?: string;
  handleClearSearch?: () => void;
}
const EmptyResultState = ({
  searchTerm,
  message,
  handleClearSearch,
}: Props) => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <img src={Emptystate} alt="emptyicon" width="150px" height="150px" />
      <Text color="secondary.dark" sx={{ wordBreak: "breakAll" }}>
        {message}
        {searchTerm && <span style={{ fontWeight: 700 }}>"{searchTerm}"</span>}
      </Text>
      {searchTerm && (
        <MainButton
          title="clear search"
          onClick={handleClearSearch}
          sx={{
            backgroundColor: "secondary.dark",
            mt: 2,
            "&:hover": { backgroundColor: "secondary.light" },
          }}
        />
      )}
    </Stack>
  );
};

export default EmptyResultState;
