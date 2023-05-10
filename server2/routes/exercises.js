const express = require("express");
const router = express.Router();
const {
  getExercises,
  createExercise,
} = require("../controllers/exercise");


//require auth for all workout routes
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get("/", getExercises);
router.post("/create", createExercise);

module.exports = router;
