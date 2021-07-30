const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const morgan = require("morgan");

const loginController = require("./controllers/login");
const registerController = require("./controllers/register");
const imageController = require("./controllers/image");

// const db = knex({
//   client: "pg",
//   connection: {
//     host: process.env.POSTGRES_HOST,
//     user: process.env.POSTGRES_USER_NAME,
//     password: process.env.POSTGRES_USER_PASSWORD,
//     database: process.env.POSTGRES_DATABASE_NAME,
//   },
// });

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/api", (req, res) => {
  res.status(200).send("Smart Brain Api");
});

app.post("/api/login", (req, res) => {
  loginController.loginUser(req, res, db, bcrypt);
});

app.post("/api/register", (req, res) => {
  registerController.signupUser(req, res, db, bcrypt);
});

app.post("/api/detectface", (req, res) => {
  imageController.detectface(req, res);
});

app.post("/api/profile/:id", (req, res) => {
  imageController.updateEntriesCount(req, res, db);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
