import mongoose from "mongoose";

// const messageSchema = mongoose.Schema({
//   message: {
//     type: String,
//     trim: true,
//     minlength: [3, "Name should not contain less than 3 characters"],
//     maxlength: [100, "Name should not contain more than 100 characters"],
//   },
// });

const InfoSchema = mongoose.Schema({
  messages: {
    type: [String],
  },

  loginTime: {
    type: Date,
    required: true,
  },

  sessionTime: {
    type: Number,
    default: 0,
  },

  active: {
    type: Boolean,
    default: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const InfoModel = mongoose.model("Info", InfoSchema);

export default InfoModel;
