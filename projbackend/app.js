require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "database-name",
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(error));
const port = process.env.PORT;
app.listen(process.env.PORT, () =>
  console.log(`the app is running at ${port}`)
);
