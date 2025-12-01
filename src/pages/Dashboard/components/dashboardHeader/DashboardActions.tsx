import PlusIcon from "@src/assets/icons/PlusIcon";
import Button from "@src/components/general/Button";

const DashboardActions = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      title="add job"
      startIcon={<PlusIcon />}
      sx={{ width: "250px" }}
    />
  );
};

export default DashboardActions;
