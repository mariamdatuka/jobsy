import Input from "../general/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddJobSchema } from "@src/schemas/schemas";
import SelectInput from "../general/SelectInput";
import DatePickerValue from "../general/Datepicker";
import { StatusOptions, VacancyTypeOptions } from "./helper";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import type { Task } from "@src/types/commonTypes";
import { useUserStore } from "@src/store/userStore";

interface AddJobFormProps {
  onSubmit: (values: Task, userId: string) => Promise<void> | void;
}

const AddJobForm = ({ onSubmit }: AddJobFormProps) => {
  const session = useUserStore((state) => state.session);
  const methods = useForm({
    resolver: yupResolver(AddJobSchema),
    defaultValues: {
      company_name: "",
      position: "",
      link: "",
      salary: "",
      vacancy_type: "Remote",
      country: "",
      status: "Applied",
      date_applied: dayjs(),
      // resume: null,
      notes: "",
    },
    mode: "all",
  });

  const internalSubmit = async (userData: any) => {
    await onSubmit(userData, session?.user.id!);
    console.log("Submitted data:", userData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(internalSubmit)} id="add-job-form">
        <Stack spacing={1.5}>
          <Input label="Company Name" name="company_name" />
          <Input label="Position" name="position" />
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
              name="date_applied"
            />
          </Stack>
          <SelectInput
            name="vacancy_type"
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
