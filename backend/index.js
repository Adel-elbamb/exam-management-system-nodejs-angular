import express from 'express';
import * as dotenv from 'dotenv' ;
import route_page from './src/bootsrap.js'
import path from 'path'
dotenv.config({path:path.resolve('./config/.env')})
const port = process.env.PORT||3000;
const app = express();
route_page(app,express)


app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});