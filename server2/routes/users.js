const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  updateUserLog,
  updateUserRoutines,
  updateUser,
} = require("../controllers/user");

router.get("/:id", getUser);
router.post("/create", createUser);
router.put('updatelog/:id', updateUserLog);
router.put("updateroutines/:id", updateUserRoutines);
router.put("updateinfo/:id", updateUser);

module.exports = router;
