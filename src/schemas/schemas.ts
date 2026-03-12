import type { Dayjs } from "dayjs";
import * as yup from "yup";

export const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
const nameRegex = /^[a-zA-Z]+$/;
const lastNameRegex = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;

export const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .trim()
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      passwordRegex,
      "Only Latin letters and at least one uppercase letter and one number",
    ),

  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .test("password-match", "Passwords must match", function (value) {
      return value === this.parent.password;
    }),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "at least 2 characters")
    .max(20, "at most 20 characters")
    .trim()
    .matches(nameRegex, "Only Latin letters are allowed"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "at least 2 characters")
    .max(30, "at most 30 characters")
    .trim()
    .matches(lastNameRegex, "Only Latin letters are allowed"),
});

export const AddJobSchema = yup.object().shape({
  company_name: yup
    .string()
    .min(2, "at least 2 characters")
    .max(30, "at most 30 characters")
    .when("autofilled", ([autofilled], schema) => {
      return autofilled ? schema.notRequired() : schema.required("Required");
    }),

  position: yup
    .string()
    .required("Position is required")
    .min(2, "at least 2 characters")
    .max(30, "at most 30 characters"),
  country: yup.string(),
  link: yup
    .string()
    .transform((value) => {
      if (!value) return value; // leave null/empty string as-is
      return value.startsWith("https") ? value : `https://${value}`;
    })
    .url("Is not a valid URL"),
  salary: yup.string().max(30, "at most 20 characters"),
  vacancy_type: yup.string(),
  status: yup.string(),
  notes: yup.string().max(500, "Maximum 500 characters allowed"),
  date_applied: yup.mixed<Dayjs>().nullable(),
  autofilled: yup.boolean().default(false),
  // resume: yup.mixed().nullable(),
});

export const resetPasswordSchema = yup.object().shape({
  code: yup.string().required("please enter code"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      passwordRegex,
      "Only Latin letters and at least one uppercase letter and one number",
    ),

  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .test("password-match", "Passwords must match", function (value) {
      return value === this.parent.password;
    }),
});

export const PersonalInfoSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .trim()
    .email("Invalid email format"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "at least 2 characters")
    .max(20, "at most 20 characters")
    .trim()
    .matches(nameRegex, "Only Latin letters are allowed"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "at least 2 characters")
    .max(30, "at most 30 characters")
    .trim()
    .matches(lastNameRegex, "Only Latin letters are allowed"),
});

export const ExtendedResetPasswordSchema = resetPasswordSchema.shape({
  currentPassword: yup.string().required("can not be empty"),
});
