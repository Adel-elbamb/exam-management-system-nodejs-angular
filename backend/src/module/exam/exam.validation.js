import Router from 'express'

import {auth , restrictTo} from './../../middleware/auth.js'
const router = Router()


// router.post('/' ,auth, restrictTo("Admin"), createExam)
// router.put('/:id' ,auth, restrictTo("Admin"), updateExam)
// router.delete('/:id' ,auth, restrictTo("Admin"), deleteExam)


export default router