require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

app.use("/api",authRoutes);

// app.use()

app.use(bodyParser.json);
app.use(cookieParser());
app.use(cors());

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
