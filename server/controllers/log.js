const { default: mongoose } = require("mongoose");
const Log = require("../models/log");
const User = require("../models/user");

const getLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createLog = async (req, res) => {
  try {
    const newLog = await Log.create(req.body);
    res.status(200).json(newLog);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};



module.exports = { getLogs, createLog };
