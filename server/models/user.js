const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: { type: String },
  uid: { type: String },
  // handle: { type: String },
  age: { type: Number },
  weight: { type: Number },
  routines: [],
  log: [],
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

//static signup method
UserSchema.statics.signup = async function (email, password) {
  //validate email n password
  if (!email || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    //Send back details about criteria for a password strength
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const exercises = [
    "645ae2215a22a8ffb1eced8d",
    "645ae2215a22a8ffb1eced8e",
    "645ae2215a22a8ffb1eced8f",
  ];
  const user = await this.create({ email, password: hash, exercises });
  return user;
};

//static login method
UserSchema.statics.login = async function (email, password) {
  //validate email n password
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("No account found with that email address.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
