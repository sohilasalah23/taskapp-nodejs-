import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { dbconnection } from "./Database/connection.js";
import { allRoutes } from './src/modules/routes.js';
import { globalError } from './src/utils/globalErrorHandle.js';
const app = express()
const port = 3000



app.use(express.json())



allRoutes(app)





dbconnection()

app.use("*", (req, res, next) => {
    next(new appError(`invalid URL ${req.originalUrl}`, 404))
})

app.use(globalError)





app.listen(port, () => console.log(`app listening on port ${port}!`))
