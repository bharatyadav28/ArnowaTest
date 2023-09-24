import express from "express";

import {
  login,
  logout,
  showCurrentUser,
} from "../controllers/authController.js";
import authentication from "../middlewares/authentication.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").get(authentication, logout);
router.route("/showCurrentUser").get(authentication, showCurrentUser);

export default router;
