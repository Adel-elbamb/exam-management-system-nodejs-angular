import examModel from "../../../../DB/models/Exam.model.js";
import resultModel from "../../../../DB/models/Result.model.js";
import questionModel from "../../../../DB/models/Question.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

// ==============================

// View Student's Own Results
export const viewMyResults = asyncHandler(async (req, res, next) => {
    // Check if user is authenticated and is a student
    if (!req.user || req.user.role !== 'User') {
        return next(new Error("Student access required", { cause: 403 }));
    }

    // Retrieve results for the authenticated user
    const results = await resultModel.find({ user: req.user.id }).populate({
        path: 'exam',
        select: 'title'
    });

    res.status(200).json({ message: "Results retrieved successfully", results });
});

// View All Students' Results for an Exam (Admin Only)
export const viewExamResults = asyncHandler(async (req, res, next) => {
    const { examId } = req.params;

    // Check if user is authenticated and is an admin
    if (!req.user || req.user.role !== 'Admin') {
        return next(new Error("Admin access required", { cause: 403 }));
    }

    // Find the exam
    const exam = await examModel.findById(examId);
    if (!exam) {
        return next(new Error("Exam not found", { cause: 404 }));
    }

    // Retrieve all results for the exam
    const results = await resultModel.find({ exam: examId }).populate({
        path: 'user',
        select: 'username email'
    }).populate({
        path: 'exam',
        select: 'title'
    });

    res.status(200).json({ message: "Exam results retrieved successfully", results });
});



