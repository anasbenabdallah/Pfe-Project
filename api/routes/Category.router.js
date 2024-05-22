const express = require("express");
var CategoryRouter = express.Router();
const controller = require("../controllers/Category.controllers");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

CategoryRouter.post("/addCategory", controller.createCategory);
CategoryRouter.get("/getCategories", controller.getCategories);
CategoryRouter.put("/updateCategory/:id", isAdmin, controller.updateCategory);
CategoryRouter.delete(
  "/deleteCategory/:id",
  isAdmin,
  controller.deleteCategory
);

module.exports = CategoryRouter;
