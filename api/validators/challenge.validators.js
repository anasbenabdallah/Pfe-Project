const yup = require("yup");

const challengeSchemaValidator = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number("")
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),
  deadline: yup.date(),
  RecommendedSkills: yup.array().of(yup.string()),
});

module.exports = {
  challengeSchemaValidator,
};
