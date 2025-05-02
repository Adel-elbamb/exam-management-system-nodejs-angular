import Router from 'express'
import {createExam ,updateExam ,deleteExam , ViewExam} from './controller/exam.controller.js'
import {auth , restrictTo} from './../../middleware/auth.js'
const router = Router()

router.get('/' , auth , ViewExam)
// admin acess 
router.post('/' ,auth, restrictTo("Admin"), createExam)
router.put('/:id' ,auth, restrictTo("Admin"), updateExam)
router.delete('/:id' ,auth, restrictTo("Admin"), deleteExam)


export default router