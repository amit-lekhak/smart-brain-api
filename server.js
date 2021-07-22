const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();


const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: process.env.POSTGRES_USER_NAME,
    password: process.env.POSTGRES_USER_PASSWORD,
    database: process.env.POSTGRES_DATABASE_NAME,
  },
});


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/", (req, res) => {
  res.status(200).send("Smart Brain Api");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
