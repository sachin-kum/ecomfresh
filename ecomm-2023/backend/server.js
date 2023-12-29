const app = require("./app");
const dotenv = require("dotenv").config({ path: "backend/.env" });
const connectDb = require("./database/db");
const cors = require("cors");
const cloudinary = require("cloudinary");
// console.log(process.env.PORT);
const port = process.env.PORT || 4000;
console.log("gjh", process.env.PORT);
// dotenv.config({  });

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectDb();

cloudinary.config({
  cloud_name: "dteyooywj",
  api_key: "953838524924364",
  api_secret: "qxlEAXI9SEmbH04AmudLTuRRdMk",
});

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
