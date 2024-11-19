const express = require("express");
const isAuth  = require("../middleware/user");

const {
  setup2FA
  , verifyOTP
  , register
  , login
} = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/enable-2fa").get(isAuth, setup2FA);
router.route("/verify-opt").post(isAuth, verifyOTP);

module.exports = router;
