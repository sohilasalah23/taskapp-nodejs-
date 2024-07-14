import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

import { handleAsynError } from "../../middleware/handleAsyncError.js";
import { appError } from "../../utils/appError.js"
import userModel from "../../../Database/models/user.model.js";

/* S I G N      U P      */

export const signUp = handleAsynError(async (req, res, next) => {
    let { Name, email, password, repassword } = req.body
    let foundeduser = await userModel.findOne({ email })
    if (foundeduser) return next(new appError(`email already exist`, 409))
    let hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDES))
    let addeduser = await userModel.insertMany({ Name, email, password: hashPassword })
    res.status(201).json({ message: "Done ", addeduser })
})
/* S I G N      I N  */
export const signIn = handleAsynError(async (req, res, next) => {
    let { email, password } = req.body
    let foundeduser = await userModel.findOne({ email })
    if (!foundeduser) return next(new appError("u have to register first", 404))
    let matched = bcrypt.compareSync(password, foundeduser.password)
    if (matched) {
        let token = Jwt.sign({ id: foundeduser._id }, process.env.SECRET_KEY)
        res.status(200).json({ message: "welcome", foundeduser, token })
    } else {
        next(new appError("wrong password", 400))
    }
})
