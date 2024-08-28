const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

const { SERVER_HOST } = process.env;

const doc = {
  info: {
    title: "Song Manager API Doc",
    description: "API documentation for Song Manager Service",
    version: "1.0.0",
    contact: {
      name: "Alemayehu Mekonen",
      email: "alemayehu.dev@gmail.com",
      url: "https://alemayehu.vercel.app",
    },
  },
  host: SERVER_HOST,
  basePath: "/",
  schemes: ["http", "https"], // Allow both http and https
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation has been regenerated successfully");
});
