const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use("/", require("./routes/tours"));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
