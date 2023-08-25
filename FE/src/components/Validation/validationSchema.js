import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .matches(/^(?!\s+$)/, "Enter your Email"),
  password: yup.string().required("Password is required"),
});

export const registrationValidation = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .matches(/^[a-zA-Z\\s]*$/, "Enter a valid First Name"),
  last_name: yup
    .string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z\\s]*$/, "Enter a valid Last Name"),
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .matches(/^(?!\s+$)/, "Enter your Email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a special character"),
  role: yup
    .string()
    .required("Role is required")
    .matches(/^[a-zA-Z\\s]*$/, "Enter a valid Role"),
});
