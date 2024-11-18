const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const routesUsers = require("./routes/users");

const errorHandler = require("./middleware/error");
dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/users", routesUsers);

app.use(errorHandler);

const server = app.listen(
    process.env.PORT,
    console.log(`Service express start: ${process.env.PORT}  `)
  );