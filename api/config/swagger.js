const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs for WyPlay project",
      version: "1.0.0",
      description: "express library API for the WyPlay project",
    },
    servers: [{ url: "http://localhost:3000" }],
    //find the api in the route folder
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
