import Input from "../general/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddJobSchema } from "@src/schemas/schemas";
import SelectInput from "../general/SelectInput";
import DatePickerValue from "../general/Datepicker";
import { StatusOptions, VacancyTypeOptions } from "./helper";
import { Stack } from "@mui/material";
interface AddJobFormProps {
  onSubmit: (data: any) => Promise<void> | void;
}

const AddJobForm = ({ onSubmit }: AddJobFormProps) => {
  const methods = useForm({
    resolver: yupResolver(AddJobSchema),
    defaultValues: {
      companyName: "",
      positionName: "",
      link: "",
      salary: "",
      vacancyType: "Remote",
      country: "",
      status: "Applied",
      dateApplied: null,
      // resume: null,
      notes: "",
    },
    mode: "all",
  });

  const internalSubmit = async (userData: any) => {
    console.log("data", userData);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(internalSubmit)} id="add-job-form">
        <Stack spacing={1.5}>
          <Input label="Company Name" name="companyName" />
          <Input label="Position" name="positionName" />
          <Input label="Link to vacancy" name="link" />
          <Input label="Salary" name="salary" />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap="15px"
          >
            <SelectInput
              name="status"
              label="Status"
              options={StatusOptions}
              width={200}
            />
            <DatePickerValue
              label="Date Applied"
              width={200}
              name="dateApplied"
            />
          </Stack>
          <SelectInput
            name="vacancyType"
            label="Type"
            options={VacancyTypeOptions}
            width="100%"
          />
          <Input label="Country" name="country" />
          <Input label="Notes" name="notes" multiline rows={2} />
        </Stack>
      </form>
    </FormProvider>
  );
};

export default AddJobForm;
