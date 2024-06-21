//used to validate user input
const yup = require("yup");

const testerRegisterValidator = yup.object().shape({
  testerName: yup.string().required("testerName is required"),
  password: yup
    .string()
    .required()
    .max(1024)
    .min(6, "Password must be at least 6 characters long"),
  email: yup.string().email("Email must be a valid email address").required(),
  role: yup.string().required("role is required"),
});

const testerEditProfileValidator = yup.object().shape({
  testerName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "First name must only contain letters"),
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
  dateoffoundation: yup.string(),
  picturePath: yup.string(),
});

module.exports = {
  testerRegisterValidator,
  testerEditProfileValidator,
};
