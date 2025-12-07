import React from "react";
import Input from "../general/Input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddJobSchema } from "@src/schemas/schemas";
import SelectInput from "../general/SelectInput";
import DatePickerValue from "../general/Datepicker";

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
    console.log("hi");
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SelectInput
          name="vacancyType"
          label="type"
          options={[{ label: "bla1", value: "bla2" }]}
        />
        <DatePickerValue />
        {/* <Input label="Company Name" name="companyName" />
        <Input label="Position" name="positionName" />
        <Input label="Link to vacancy" name="link" />
        <Input label="Salary" name="salary" /> */}

        {/* <Input label="Country" name="country" />
        <Input label="Status" name="status" /> */}
        {/* <Input label="Date Applied" name="dateApplied" type="date" />
        {/* <Input label="Resume" name="resume" type="file" /> */}
        {/* <Input label="Notes" name="notes" /> */}
      </form>
    </FormProvider>
  );
};

export default AddJobForm;
