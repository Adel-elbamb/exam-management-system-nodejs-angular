import examModel from "../../../../DB/models/Exam.model.js";
import questionModel from "../../../../DB/models/Question.model.js";
import resultModel from "../../../../DB/models/Result.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

//create exam 
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
})

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

// View Available Exams
export const viewExams = asyncHandler(async (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
        return next(new Error("Authentication required", { cause: 401 }));
    }

    // Retrieve all exams with basic details (title, description)
    const exams = await examModel.find().select('title description createdBy createdAt');
    res.status(200).json({ message: "Exams retrieved successfully", exams });
});


//take your exam 
export const takeExam = asyncHandler(async(req,res,next) => {
    const {id} = req.params
    if(! req.user &&  !req.user.role == 'User') {
        return next(new Error("Student access required", { cause: 403 }));
    }

   const exam = await examModel.findById(id) 
    if(!exam) {
        return next(new Error (" invalid id of Exam ") , {cause:400})
    }
    res.status(200).json({message : "sucess" , exam})
})



//submit Exam and calculat the result of exam 
// Submit Exam (Take Exam)
export const submitExam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { answers } = req.body;

    // Check if user is authenticated and is a student
    if (!req.user || req.user.role !== 'User') {
        return next(new Error("Student access required", { cause: 403 }));
    }
   console.log(req.user._id)
    // Find the exam and populate questions
    const exam = await examModel.findById(id).populate('questions');
    if (!exam) {
        return next(new Error("Exam not found", { cause: 404 }));
    }

    // Check if the student has already taken the exam
    const existingResult = await resultModel.findOne({ user: req.user._id, exam: id });
    if (existingResult) {
        return next(new Error("You have already taken this exam", { cause: 400 }));
    }

    // Validate answers
    if (!Array.isArray(answers) || answers.length !== exam.questions.length) {
        return next(new Error("Invalid answers provided", { cause: 400 }));
    }

    // Calculate score
    let score = 0;
    exam.questions.forEach((question, index) => {
        if (answers[index] !== undefined && question.options[answers[index]]?.isCorrect) {
            score++;
        }
    });

    // Save result
    const result = await resultModel.create({
        user: req.user._id,
        exam: id,
        answers,
        score,
        total: exam.questions.length
    });

    res.status(200).json({ message: "Exam submitted successfully", result: { score, total: exam.questions.length } });
});






