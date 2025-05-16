import Router from 'express'
import {createExam ,updateExam ,deleteExam , viewExams,takeExam,submitExam} from './controller/exam.controller.js'
import {auth , restrictTo} from './../../middleware/auth.js'
const router = Router()

router.get('/' , auth , viewExams)
// admin acess 
router.post('/' ,auth, restrictTo("Admin"), createExam)
router.put('/:id' ,auth, restrictTo("Admin"), updateExam)
router.delete('/:id' ,auth, restrictTo("Admin"), deleteExam)
//user acess
router.get('/:id' , auth,restrictTo("User") , takeExam)
router.post('/:id' , auth,restrictTo("User") , submitExam)


export default router