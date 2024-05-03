import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const problemSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model("problem", problemSchema);

export default Problem;
