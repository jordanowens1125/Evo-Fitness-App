const express = require("express");
const router = express.Router();
const {
  loginUser,
  signUp,
  updateUserLog,
  updateUserRoutines,
  updateUser,
  getUser,
  updateUserWeightLog,
} = require("../controllers/user");

//login
router.post('/login', loginUser)

//signup
router.post("/signup",signUp);

//require auth 
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)


router.get('/', getUser)
router.put('/updatelog/', updateUserLog);
router.put("/updateroutines", updateUserRoutines);
router.put("/updateinfo", updateUser);
router.put("/updateweight", updateUserWeightLog);

module.exports = router;
