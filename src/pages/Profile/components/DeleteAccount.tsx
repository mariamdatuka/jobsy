import { Divider } from "@mui/material";
import MainButton from "@src/components/general/Button";

const DeleteAccount = () => {
  return (
    <>
      <Divider sx={{ mt: 4 }} />
      <MainButton
        title="delete account"
        variant="contained"
        sx={{ backgroundColor: "error.main", width: "200px", my: 5 }}
      />
    </>
  );
};

export default DeleteAccount;
