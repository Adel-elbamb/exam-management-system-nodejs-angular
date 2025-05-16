import mongoose, { Schema, model, Types } from "mongoose";

const examSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Exam title is required"],
    },
    description: {
      type: String,
    },
    questions: [
      {
        type: Types.ObjectId,
        ref: "Question",
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const examModel = mongoose.models.Exam || model("Exam", examSchema);

export default examModel;
