const createError = require("http-errors");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8000; //sets port value
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" }); //loads variables from .env file into process.env
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/exercises", require("./routes/exercises"));
// app.use("/logs", require("./routes/logs"));
app.use("/users", require("./routes/users"));
app.use('/persist', require("./routes/persist"))

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}.`);
});

module.exports = app;