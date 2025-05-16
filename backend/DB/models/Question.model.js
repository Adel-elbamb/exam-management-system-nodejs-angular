import mongoose, { Schema, model, Types } from "mongoose";

const questionSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Question text is required"],
    },
    options: [
      {
        text: {
          type: String,
          required: [true, "Option text is required"],
        },
        isCorrect: {
          type: Boolean,
          default:false,
          required: [true, "isCorrect is required"],
        },
      },
    ],
    exam: {
      type: Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam reference is required"],
    },
  },
  { timestamps: true }
);

const questionModel = mongoose.models.Question || model("Question", questionSchema);

export default questionModel;
