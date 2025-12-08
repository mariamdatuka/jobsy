import Input from "../general/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddJobSchema } from "@src/schemas/schemas";
import SelectInput from "../general/SelectInput";
import DatePickerValue from "../general/Datepicker";
import { StatusOptions } from "./helper";
import { Stack } from "@mui/material";

const AddJobForm = () => {
  const methods = useForm({
    resolver: yupResolver(AddJobSchema),
    defaultValues: {
      companyName: "",
      positionName: "",
      link: "",
      salary: "",
      vacancyType: "",
      country: "",
      status: "",
      dateApplied: null,
      // resume: null,
      notes: "",
    },
    mode: "all",
  });

  const onSubmit = async (userData: any) => {
    console.log("userData", userData);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={1.5}>
          <Input label="Company Name" name="companyName" />
          <Input label="Position" name="positionName" />
          <Input label="Link to vacancy" name="link" />
          <Input label="Salary" name="salary" />
          <Input label="Country" name="country" />
          <Stack direction="row" alignItems="center" justifyContent="center">
            <SelectInput
              name="status"
              label="Status"
              options={StatusOptions}
              width={200}
            />
            <DatePickerValue label="Date Applied" width={200} />
          </Stack>
          <Input label="Notes" name="notes" />
        </Stack>
      </form>
    </FormProvider>
  );
};

export default AddJobForm;
