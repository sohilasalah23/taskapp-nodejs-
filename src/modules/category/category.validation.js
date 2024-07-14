import Joi from "joi";




/*  A D D        C A T E G O R Y         S C H E M A */
export const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(20).required(),
})


/*      B Y     I D       S C H E M A   */
export const ByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})
/*U P D A T E         C A T E G O R Y         S C H E M A */
export const updateCategorySchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    title: Joi.string().min(3).max(20).required()
})

