import Router from 'express'
import {addQuestion,updateQuestion,deleteQuestion} from './controller/question.controller.js'
import {auth , restrictTo} from './../../middleware/auth.js'
const router = Router()


router.post('/:examId' ,auth, restrictTo("Admin"), addQuestion)
router.put('/question/:questionId' ,auth, restrictTo("Admin"), updateQuestion)
router.delete('/question/:questionId' ,auth, restrictTo("Admin"), deleteQuestion)


export default router