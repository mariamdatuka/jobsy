import NiceModal, { useModal } from "@ebay/nice-modal-react";

import PopUp from "../PopUp/PopUp";
import AddJobForm from "@src/components/forms/AddJobForm";

export interface AddJobModalProps {
  handleJobSubmit?: any;
}

const AddJobModal = NiceModal.create<AddJobModalProps>(
  ({ handleJobSubmit }) => {
    const { visible, hide } = useModal();
    // const [isSubmitting, setIsSubmitting] = useState(false);

    // const submitHandler = async (values: any) => {
    //   setIsSubmitting(true);
    //   try {
    //     if (handleJobSubmit) {
    //       await handleJobSubmit(values);
    //     }
    //     // close modal after successful submit
    //     hide();
    //   } catch (err) {
    //     // let the caller handle errors, but we still stop loading
    //     console.error("Add job submit error:", err);
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // };

    return (
      <PopUp
        open={visible}
        onClose={hide}
        children={<AddJobForm onSubmit={handleJobSubmit} />}
        buttons={[
          {
            label: "Cancel",
            color: "primary",
            variant: "outlined",
            onClick: hide,
            buttonSx: { width: "150px" },
          },
          {
            label: "Add",
            color: "primary",
            onClick: () => {},
            type: "submit",
            form: "add-job-form",
            // disabled: isSubmitting,
            buttonSx: { width: "150px" },
          },
        ]}
      />
    );
  }
);

export default AddJobModal;
