import Input from "../general/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddJobSchema } from "@src/schemas/schemas";
import SelectInput from "../general/SelectInput";
import { StatusOptions, VacancyTypeOptions } from "./helper";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import type { Task } from "@src/types/commonTypes";
import { useUserStore } from "@src/store/userStore";
import { buildPatchPayload, toCapitalizeFormat } from "@src/helpers/helpers";
import { useCallback, useEffect, useState, type AnimationEvent } from "react";
import { RHFDatePicker } from "../general/RHFDatePicker";
import { GetCountries } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

interface AddJobFormProps {
  onSubmit: (values: Task, userId: string) => Promise<void> | void;
  initialTask?: Task;
  onFormStateChange?: (isSubmittable: boolean) => void;
  isEditMode?: boolean;
}

const AddJobForm = ({
  onSubmit,
  initialTask,
  onFormStateChange,
  isEditMode = false,
}: AddJobFormProps) => {
  const [countries, setCountries] = useState<any>([]);
  const session = useUserStore((state) => state.session);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
    });
  }, []);

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
    mode: "onChange",
  });

  const onUserNameAnimationStart = useCallback(
    (event: AnimationEvent<HTMLDivElement>): void => {
      if (event.animationName === "mui-auto-fill") {
        console.log("Autofill detected");
        methods.setValue("autofilled", true, { shouldValidate: true });
      }
    },
    [methods],
  );

  const formValues = methods.watch();
  const disableDate = formValues.status === "Saved";

  const status = methods.watch("status");
  const date = methods.watch("date_applied");

  useEffect(() => {
    if (status === "Saved") {
      methods.setValue("date_applied", null);
    } else if (!date) {
      methods.setValue("date_applied", dayjs(), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [status]);

  const { isDirty } = methods.formState;

  const isSubmittable =
    isDirty || (formValues.autofilled && !!formValues.company_name?.trim());

  useEffect(() => {
    onFormStateChange?.(isSubmittable);
  }, [isSubmittable, onFormStateChange]);

  useEffect(() => {
    if (
      Object.keys(methods.formState.dirtyFields).length > 0 &&
      formValues.autofilled
    ) {
      methods.setValue("autofilled", false, { shouldValidate: true });
    }
  }, [formValues, methods.formState.dirtyFields, methods]);

  const internalSubmit = async (userData: any) => {
    if (!isSubmittable) return;
    const payload = isEditMode
      ? buildPatchPayload(userData, methods.formState.dirtyFields)
      : userData;

    await onSubmit(payload, session?.user.id!);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(internalSubmit)} id="add-job-form">
        <Stack spacing={1.5}>
          <Input
            label="Company Name"
            name="company_name"
            slotProps={{
              input: { onAnimationStart: onUserNameAnimationStart },
            }}
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
            <SelectInput
              name="vacancy_type"
              label="Type"
              options={VacancyTypeOptions}
              width={200}
            />
          </Stack>

          <RHFDatePicker
            name="date_applied"
            label="Date Applied"
            width="100%"
            disabled={disableDate}
          />
          <SelectInput
            name="country"
            label="Country"
            countryOptions={countries}
            width="100%"
          />
          <Input label="Notes" name="notes" multiline rows={2} />
        </Stack>
      </form>
    </FormProvider>
  );
};

export default AddJobForm;
