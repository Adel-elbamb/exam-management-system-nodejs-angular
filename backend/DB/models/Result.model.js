import mongoose, { Schema, model, Types } from "mongoose";

const resultSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    exam: {
      type: Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam is required"],
    },
    answers: [
      {
        type: Number, 
      },
    ],
    score: {
      type: Number,
      required: [true, "Score is required"],
    },
    total: {
      type: Number,
      required: [true, "Total score is required"],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const resultModel = mongoose.models.Result || model("Result", resultSchema);

export default resultModel;
