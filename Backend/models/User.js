import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
      minLength: [3, "Name should not contain less than 3 characters"],
      maxLength: [10, "Name should not contain more than 10 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
      // unique: true,
    },

    mobileno: {
      type: String,
      required: [true, "Please provide Mobile number "],
      validate: [
        (val) => {
          return val.toString().length === 10;
        },
        "Mobile no. must have 10 digits",
      ],
    },

    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
