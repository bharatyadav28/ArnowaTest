import express from "express";

import {
  createMessage,
  getUserInfo,
  getAllUsersInfo,
} from "../controllers/infoController.js";
import authentication from "../middlewares/authentication.js";

const router = express.Router();

router.route("/message").post(authentication, createMessage);
router.route("/").get(authentication, getUserInfo);

export default router;
