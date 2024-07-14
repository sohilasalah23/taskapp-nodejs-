import { appError } from "../utils/appError.js"

export const validation = (schema) => {
    return (req, res, next) => {
        let filters = { ...req.body, ...req.params, ...req.query }

        let { error } = schema.validate(filters, { abortEarly: false })
        if (!error) {
            next()
        } else {
            let errorList = []
            error.details.forEach(ele => {
                errorList.push(ele.message)
            })
            next(new appError(errorList, 401))
        }
    }
}
