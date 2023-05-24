const { default: mongoose } = require("mongoose");
const Exercise = require("../models/exercise");
const User = require("../models/user");

const getExercises = async (req, res) => {
  try {
    const user_id = req.user._id;
    const exercises = await Exercise.find({ user: user_id });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createExercise = async (req, res) => {
  try {
    const exercise = req.body;
    const user_id = req.user._id;
    exercise.user = user_id;
    let newExercise = await Exercise.findOne({ name: exercise.name });
    if (!newExercise) {
      newExercise = await Exercise.create(exercise)
      //exercise not found
      await User.findByIdAndUpdate(user_id, {
        $addToSet: {
          exercises: newExercise._id,
        },
      });
    } else {
      //exercise found
      await User.findByIdAndUpdate(user_id, {
        $addToSet: {
          exercises: newExercise._id
        }
      })
    }

    res.status(200).json(newExercise);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = { getExercises, createExercise };
