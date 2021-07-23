require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const port = process.env.PORT;

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: "tshirt",
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(error));

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);

//listening on port
app.listen(process.env.PORT, () =>
  console.log(`the app is running at ${port}`)
);
