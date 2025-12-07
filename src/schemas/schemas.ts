import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
const nameRegex = /^[a-zA-Z]+$/;

export const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      passwordRegex,
      "only Latin letters and at least one uppercase letter, one number"
    ),
  firstName: yup
    .string()
    .required("First name is required")
    .matches(nameRegex, "Only Latin letters are allowed"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(nameRegex, "Only Latin letters are allowed"),
});

export const AddJobSchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  positionName: yup
    .string()
    .required("Position is required")
    .min(2, "at least 2 characters")
    .max(30, "at most 30 characters"),
  country: yup.string(),
  link: yup.string().url("Must be a valid URL").nullable(),
  salary: yup.string(),
  vacancyType: yup.string().required("Vacancy type is required"),
  status: yup.string(),
  notes: yup.string().max(500, "Maximum 500 characters allowed"),
  dateApplied: yup.date().nullable(),
  // resume: yup.mixed().nullable(),
});
