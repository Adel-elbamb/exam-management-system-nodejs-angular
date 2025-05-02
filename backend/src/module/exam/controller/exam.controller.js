import examModel from "../../../../DB/models/Exam.model.js";
import questionModel from "../../../../DB/models/Question.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const createExam = asyncHandler(async (req, res, next) => {
    // Extract data from request body
    const { title, description, questions } = req.body;

    // Check if user is authenticated and is an admin
    if (!req.user || req.user.role !== 'Admin') {
        return next(new Error("Admin access required", { cause: 403 }));
    }

    // Validate required fields
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
        return next(new Error("Title and at least one question are required", { cause: 400 }));
    }

    // Validate each question
    for (const question of questions) {
        if (!question.text || !Array.isArray(question.options) || question.options.length !== 4) {
            return next(new Error("Each question must have text and exactly 4 options", { cause: 400 }));
        }
        const hasCorrectOption = question.options.some(opt => opt.isCorrect);
        if (!hasCorrectOption) {
            return next(new Error("Each question must have one correct option", { cause: 400 }));
        }
    }

    // Create the exam
    const exam = await examModel.create({
        title,
        description,
        createdBy: req.user._id,
        questions: []
    });

    // Create questions and link them to the exam
    const questionDocs = await questionModel.insertMany(
        questions.map(q => ({
            text: q.text,
            options: q.options,
            exam: exam._id
        }))
    );

    // Update exam with question IDs
    exam.questions = questionDocs.map(q => q._id);
    await exam.save();

    // Return success response
    res.status(201).json({ message: "Exam created successfully", exam });
});

export const ViewExam = asyncHandler(
    async(req, res ,next) => {
        if(!req.user) {
            return next(new Error("Please login before View  Exam ", { cause: 403 })); 
        }
    }
)


// Update Exam
export const updateExam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    // Check if user is authenticated and is an admin
    if (!req.user || req.user.role !== 'Admin') {
        return next(new Error("Admin access required", { cause: 403 }));
    }

    // Find the exam
    const exam = await examModel.findById(id);
    if (!exam) {
        return next(new Error("Exam not found", { cause: 404 }));
    }

    // Update fields if provided
    if (title) exam.title = title;
    if (description) exam.description = description;

    await exam.save();

    res.status(200).json({ message: "Exam updated successfully", exam });
});


// Delete Exam
export const deleteExam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if user is authenticated and is an admin
    if (!req.user || req.user.role !== 'Admin') {
        return next(new Error("Admin access required", { cause: 403 }));
    }

    // Find and delete the exam
    const exam = await examModel.findById(id);
    if (!exam) {
        return next(new Error("Exam not found", { cause: 404 }));
    }
    const deleteExam = await examModel.findByIdAndDelete(id);

    // Delete associated questions
    await questionModel.deleteMany({ exam: id });

    res.status(200).json({ message: "Exam and associated questions deleted successfully" });
});