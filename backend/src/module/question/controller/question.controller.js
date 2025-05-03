import examModel from "../../../../DB/models/Exam.model.js";
import questionModel from "../../../../DB/models/Question.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";


// Add Question to Exam
export const addQuestion = asyncHandler(async (req, res, next) => {
    const { examId } = req.params;
    const { text, options } = req.body;
    console.log(req.user.role)
    // Check if user is authenticated and is an admin
    if (!req.user || req.user.role !== 'Admin') {
        return next(new Error("Admin access required", { cause: 403 }));
    }
 

    // Find the exam
    const exam = await examModel.findById({_id : examId});
    // console.log(exam)
    if (!exam) {
        return next(new Error("Exam not found", { cause: 404 }));
    }

    // Validate question
    if (!text || !Array.isArray(options) || options.length !== 4) {
        return next(new Error("Question must have text and exactly 4 options", { cause: 400 }));
    }
    const hasCorrectOption = options.some(opt => opt.isCorrect);
    if (!hasCorrectOption) {
        return next(new Error("Question must have one correct option", { cause: 400 }));
    }

    // Create the question
    const question = await questionModel.create({
        text,
        options,
        exam: examId
    });

    // Add question to exam
    exam.questions.push(question._id);
    await exam.save();

    res.status(201).json({ message: "Question added successfully", question });
});

// Update Question
export const updateQuestion = asyncHandler(async (req, res, next) => {
    const { questionId } = req.params;
    const { text, options } = req.body;

    // Check if user is authenticated and is an admin
    if (!req.user || req.user.role !== 'Admin') {
        return next(new Error("Admin access required", { cause: 403 }));
    }

    // Find the question
    const question = await questionModel.findById(questionId);
    if (!question) {
        return next(new Error("Question not found", { cause: 404 }));
    }

    // Validate updates
    if (options && (!Array.isArray(options) || options.length !== 4)) {
        return next(new Error("Question must have exactly 4 options", { cause: 400 }));
    }
    if (options) {
        const hasCorrectOption = options.some(opt => opt.isCorrect);
        if (!hasCorrectOption) {
            return next(new Error("Question must have one correct option", { cause: 400 }));
        }
    }

    // Update fields if provided
    if (text) question.text = text;
    if (options) question.options = options;

    await question.save();

    res.status(200).json({ message: "Question updated successfully", question });
});

// Delete Question
export const deleteQuestion = asyncHandler(async (req, res, next) => {
    const { questionId } = req.params;

    // Check if user is authenticated and is an admin
    if (!req.user || req.user.role !== 'Admin') {
        return next(new Error("Admin access required", { cause: 403 }));
    }

    // Find and delete the question
    const question = await questionModel.findByIdAndDelete(questionId);
    if (!question) {
        return next(new Error("Question not found", { cause: 404 }));
    }

    // Remove question from associated exam
    //update the exam have the Question 
    await examModel.updateOne(
        { questions: questionId },
        { $pull: { questions: questionId } }
    );

    res.status(200).json({ message: "Question deleted successfully" });
});