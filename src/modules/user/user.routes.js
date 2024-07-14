





import express from "express";
import { signIn, signUp } from "./user.controller.js";
import { validation } from "../../middleware/validation.js";
import { signUpSchema } from "./user.validator.js";





const userRoutes = express.Router()


/* S I G N      U P      */
userRoutes.post("/signUp", validation(signUpSchema), signUp)
/* S I G N      I N  */
userRoutes.post("/signIn", signIn)






export default userRoutes