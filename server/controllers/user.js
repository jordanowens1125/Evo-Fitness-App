const { default: mongoose } = require("mongoose");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

const createToken = (_id) => {
  return JWT.sign({ _id }, process.env.SECRET, {
    expiresIn: "2d",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //make token
    delete user.password;
    const token = createToken(user._id);
    res.status(200).json({
      user: {
        exercises: user.exercises,
        log: user.log,
        routines: user.routines,
        name: user.name,
      },
      token,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    //make token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const id = req.user._id || null;
  if (!id) {
    throw Error("Invalid request");
  }
  try {
    const user = await User.findById(id).populate("exercises");

    res.status(200).json({
      user: {
        email: user.email,
        exercises: user.exercises,
        log: user.log,
        routines: user.routines,
        name: user.name,
        Weight: user.Weight,
        age: user.age,
        weightLog: user.weightLog,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUserLog = async (req, res) => {
  try {
    const log = req.body;
    const id = req.user._id;
    //need id so i know who to update
    //update user log
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        log: log,
      }
    );
    res.status(200).json();
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUserRoutines = async (req, res) => {
  try {
    const id = req.user._id;
    const routines = req.body;
    //update user routines
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        routines: routines,
      }
    );
    delete user.password;
    res.status(200).json();
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.user._id;
    const { name, dob, Weight, weightLog } = req.body;
    await User.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        dob: dob,
        Weight: Weight,
        weightLog: weightLog,
      }
    );
    res.status(200).json();
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUserWeightLog = async (req, res) => {
  try {
    const weightLog = req.body;
    const id = req.user._id;
    //need id so i know who to update
    //update user log
    await User.findOneAndUpdate(
      { _id: id },
      {
        weightLog: weightLog,
      }
    );
    res.status(200).json();
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = {
  loginUser,
  signUp,
  updateUserLog,
  updateUserRoutines,
  updateUser,
  getUser,
  updateUserWeightLog,
};
