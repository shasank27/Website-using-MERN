const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1/tshirt?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "database-name",
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(error));
const port = 8080;
app.listen(8080, () => console.log(`the app is running at ${port}`));
