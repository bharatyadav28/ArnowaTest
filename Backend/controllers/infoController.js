import { StatusCodes } from "http-status-codes";

import InfoModel from "../models/Info.js";
import UserModel from "../models/User.js";
import { BadRequest, UnauthenticatedError } from "../errors/index.js";

const createMessage = async (req, res) => {
  const { userId } = req.user;
  let { message } = req.body;

  message = message.trim();
  if (message.length < 3 || message.length > 100) {
    throw new BadRequest("Message can have max 3 and min 100 characters");
  }

  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    throw new UnauthenticatedError("Please login ");
  }

  const info = await InfoModel.findOne({ user: userId, active: true });
  if (!info) {
    throw new BadRequest("Please login again");
  }

  info.messages.push(message);
  await info.save();

  res.status(StatusCodes.CREATED).json({ msg: "createMessage", user, info });
};

const getUserInfo = async (req, res) => {
  const { userId, role } = req.user;

  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    throw new UnauthenticatedError("Please login ");
  }

  let info = null;
  let userDetails = null;
  if (role === "admin") {
    info = await InfoModel.find({ user: userId, active: false });
    userDetails = await UserModel.findOne({ _id: userId });
  } else {
    info = await InfoModel.find({ user: userId, active: false });
  }

  res.status(StatusCodes.OK).json({ info, userDetails });
};

const getAllUsersInfo = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "GetallUserInfo" });
};

export { createMessage, getUserInfo, getAllUsersInfo };
