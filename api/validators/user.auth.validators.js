//used to validate user input
const yup = require("yup");

const userRegisterValidator = yup.object().shape({
  firstname: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name must only contain letters"),
  lastname: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name must only contain letters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  role: yup.string().required("Role is required"),
});

const userEditProfileValidator = yup.object().shape({
  firstname: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "First name must only contain letters"),
  lastname: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Last name must only contain letters"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  email: yup.string().email("Email must be a valid email address"),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?\d{1,14}$/,
      "Phone number must start with a '+' and have a maximum of 14 characters"
    ),
  country: yup.string(),
  birthDate: yup.date(),
  picturePath: yup.string(),
});

const loginValidator = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "email must be valid")
    .required("Email is required."),
  password: yup
    .string()
    .required()
    .max(1024, "Password must be at most 1024 characters long.")
    .min(6, "Password must be at least 6 characters long."),
});

const forgotPasswordValidator = yup.object().shape({
  email: yup.string().email("Must be a valid email address").required(),
});

const resetPasswordValidator = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required(),
});

module.exports = {
  userRegisterValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  userEditProfileValidator,
};
