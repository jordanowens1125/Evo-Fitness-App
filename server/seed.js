const mongoose = require("mongoose");
const User = require("./models/user");
const Exercise = require("./models/exercise");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/db");
const seedExercises = require("./seedFolder/exercises");
// const seedUsers = require("./seedFolder/users");
connectDB();

const seedDB = async () => {
  try {
    // await User.deleteMany({});
    // await User.insertMany(seedUsers);
    await Exercise.deleteMany({});
    await Exercise.insertMany(seedExercises);
  } catch (err) {
    console.log(err);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});