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
        email: user.email,
        exercises: user.exercises,
        log: user.log,
        routines: user.routines,
      },
      token,
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
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUserRoutines = async (req, res) => {
  try {
    const id = req.user._id;
    const routines = req.body
    //update user routines
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        routines: routines,
      }
    );
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    console.log(23);
    res.status(404).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.user._id;
    const { name, handle, age, weight, height } = req.body;
    const user = User.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        handle: handle,
        age: age,
        weight: weight,
      }
    );
    res.status(200).json(user);
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
};
