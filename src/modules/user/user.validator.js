
import Joi from "joi"
/* S I G N      U P        S C H E M A  */
export const signUpSchema = Joi.object({
    Name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,9}$/).required(),
    repassword: Joi.string().required().valid(Joi.ref('password')),


})

/* S I G N     I N       S C H E M A  */
export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
