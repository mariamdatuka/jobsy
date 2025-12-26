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
import { toCapitalizeFormat } from "@src/helpers/helpers";
import { useCallback, useEffect, type AnimationEvent } from "react";

interface AddJobFormProps {
  onSubmit: (values: Task, userId: string) => Promise<void> | void;
  initialTask?: Task;
}

const AddJobForm = ({ onSubmit, initialTask }: AddJobFormProps) => {
  const session = useUserStore((state) => state.session);

  const methods = useForm({
    resolver: yupResolver(AddJobSchema),
    defaultValues: {
      company_name: initialTask?.company_name || "",
      position: initialTask?.position || "",
      link: initialTask?.link || "",
      salary: initialTask?.salary || "",
      vacancy_type: toCapitalizeFormat(initialTask?.vacancy_type) || "Remote",
      country: initialTask?.country || "",
      status: toCapitalizeFormat(initialTask?.status) || "Applied",
      date_applied: initialTask?.date_applied
        ? dayjs(initialTask.date_applied)
        : dayjs(),
      // resume: null,
      notes: initialTask?.notes || "",
      autofilled: false,
    },
    mode: "all",
  });

  // const touched = methods.formState.touchedFields;
  // const dirty = methods.formState.dirtyFields;
  // console.log("touched fields:", touched);
  // console.log("dirty fields:", dirty);
  // console.log("form values:", methods.formState.isDirty);

  const onUserNameAnimationStart = useCallback(
    () =>
      (event: AnimationEvent<HTMLDivElement>): void => {
        if (event.animationName === "mui-auto-fill") {
          console.log("Autofill detected");
          methods.setValue("autofilled", true, { shouldValidate: true });
        }
      },
    []
  );

  const formValues = methods.watch();

  //...

  useEffect(() => {
    if (
      Object.keys(methods.formState.dirtyFields).length > 0 &&
      formValues.autofilled
    ) {
      methods.setValue("autofilled", false, { shouldValidate: true });
    }
  }, [formValues, methods.formState.dirtyFields, methods]);

  const internalSubmit = async (userData: any) => {
    if (methods.formState.isDirty) await onSubmit(userData, session?.user.id!);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(internalSubmit)} id="add-job-form">
        <Stack spacing={1.5}>
          <Input
            label="Company Name"
            name="company_name"
            slotProps={{ onAnimationStart: onUserNameAnimationStart() }}
          />
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
