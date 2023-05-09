const { default: mongoose } = require("mongoose");
const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await User.create(user);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUserLog = async (req, res) => {
  try {
    const log = req.body;
    //need id so i know who to update
    //update user log
    const user = await User.findById(id, {
      log: log,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUserRoutines = async (req, res) => {
  try {
    const routines = req.body;
    const id = req.params.id;
    //update user routines
    const user = await User.findById(id, {
      routines: routines,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, handle, age, weight, height } = req.body;
    const user = User.findById(id, {
      name: name,
      handle: handle,
      age: age,
      weight: weight,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = {
  getUser,
  createUser,
  updateUserLog,
  updateUserRoutines,
  updateUser,
};
