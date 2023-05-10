
const express = require("express");
const router = express.Router();
const { getExercises, createExercise } = require("../controllers/exercise");

router.get("/", getExercises);
router.post("/create", createExercise);

module.exports = router;