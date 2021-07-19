require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const port = process.env.PORT;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "tshirt",
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(error));


app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use("/api",authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`the app is running at ${port}`)
);
