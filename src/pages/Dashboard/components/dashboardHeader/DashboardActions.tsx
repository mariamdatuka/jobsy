import NiceModal from "@ebay/nice-modal-react";
import PlusIcon from "@src/assets/icons/PlusIcon";
import Button from "@src/components/general/Button";
import { ADD_JOB_MODAL } from "@src/modals/modal_names";

interface Props {
  handleJobSubmit?: (values: any) => Promise<void> | void;
}

const DashboardActions = ({ handleJobSubmit }: Props) => {
  const openAddJobModal = () => {
    NiceModal.show(ADD_JOB_MODAL, { handleJobSubmit });
  };
  return (
    <Button
      variant="contained"
      color="primary"
      title="add job"
      startIcon={<PlusIcon />}
      sx={{ width: "250px" }}
      onClick={openAddJobModal}
    />
  );
};

export default DashboardActions;
