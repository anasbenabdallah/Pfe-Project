const express = require("express");
const swaggerRouter = express.Router();

// Import the Swagger specifications
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../config/swagger");

// Use the Swagger UI middleware to serve the Swagger documentation
swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get("/", swaggerUi.setup(swaggerDocs));

module.exports = swaggerRouter;
