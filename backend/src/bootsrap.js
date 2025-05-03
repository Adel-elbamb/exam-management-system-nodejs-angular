import connection from "../DB/connection.js"
import AuthRouter from './module/auth/auth.router.js'
import examRouter from './module/exam/exam.route.js'
import questionRouter from './module/question/question.router.js'
import resultRouter from './module/result/result.router.js'
import { globalError } from "./utils/asyncHandler.js"
import cors from 'cors'
const boostrap = (app, express)=> {
    app.use(express.json())
    app.use(cors());
    connection()

    app.use('/auth' , AuthRouter) 
    app.use('/api/exam' ,examRouter )
    app.use('/api/exam' ,questionRouter )
    app.use('/api/result' ,resultRouter )


    app.use('/{*eny}', (req, res, next) => {
        res.status(404).json({ 
            success: false,
            message: `Can't find this route: ${req.originalUrl}` 
        });
    });
    


    app.use(globalError)
}

export default boostrap