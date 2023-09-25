import { StatusCodes } from "http-status-codes";

import UserModel from "../models/User.js";
import { createTokenUser, attachCookiesToResponse } from "../utils/index.js";
import InfoModel from "../models/Info.js";

const login = async (req, res) => {
  const { name, email, mobileno } = req.body;

  let user = await UserModel.findOne({ email });
  if (!user) {
    user = await UserModel.create({ name, email, mobileno });
  }

  const tokenUser = createTokenUser({ user });

  attachCookiesToResponse({ res, tokenUser });
  const info = await InfoModel.create({
    user: user._id,
    loginTime: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "Login successfull", user });
};

const logout = async (req, res) => {
  const { userId } = req.user;

  const userInfo = await InfoModel.findOne({ user: userId, active: true });
  const startTime = userInfo.loginTime;
  const now = new Date(Date.now());
  const sessionTime = Math.round((now - startTime) / 1000);

  userInfo.sessionTime = sessionTime;
  userInfo.active = false;
  await userInfo.save();

  res.cookie("token", "logout", {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Logout successfull" });
};

const showCurrentUser = async (req, res) => {
  const user = req.user;
  return res.status(StatusCodes.OK).json({ user });
};

export { login, logout, showCurrentUser };
