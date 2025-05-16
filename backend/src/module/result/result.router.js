import Router from 'express'
import {viewMyResults , viewExamResults} from './controller/result.controller.js'
import {auth , restrictTo} from './../../middleware/auth.js'

const router = Router()

router.get('/',auth ,restrictTo('User'), viewMyResults)
router.get('/:examId', auth, restrictTo('Admin'), viewExamResults);





export default router