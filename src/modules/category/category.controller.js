
import categoryModel from "../../../Database/models/category.model.js"
import { handleAsynError } from "../../middleware/handleAsyncError.js"
import apiFeature from "../../utils/apiFeatures.js"
import { appError } from "../../utils/appError.js"


/* A D D     C A T E G O R  Y  */
export const addCategory = handleAsynError(async (req, res) => {
    let { title, tasks } = req.body
    let preCategory = new categoryModel({ title, tasks, user: req.userId })
    let addedCategory = await preCategory.save()
    res.json({ message: "added", addedCategory })
})
// /* G E T    A L L       C A T E G O R  Y     F O R    S P E C I F I C     u S E R */
export const getAllCategories = handleAsynError(async (req, res) => {

    let apiFeatures = new apiFeature(categoryModel.find({ user: req.userId }), req.query).pagination().filter()
    let allCategories = await apiFeatures.mongooseQuery;
    res.json({ message: "done", page: apiFeatures.page, allCategories })

})

// /*  U P D A T E          C A T E G O R  Y      */
export const updateCategory = handleAsynError(async (req, res, next) => {
    let foundedCategory = await categoryModel.findById(req.params.id)
    if (!foundedCategory) return next(new appError(`not found category`, 409))
    if (foundedCategory.user != req.userId) return next(new appError(`u are not creator`, 409))
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updatedCategory && res.json({ message: "done", updatedCategory })
})

/*  D E L E T E        C A T E G O R Y  */
export const deleteCategory = handleAsynError(async (req, res, next) => {
    let foundedCategory = await categoryModel.findById(req.params.id)
    if (!foundedCategory) return next(new appError(`not found category`, 409))
    if (foundedCategory.user != req.userId) return next(new appError(`u are not creator`, 409))
    let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id)
    deletedCategory && res.json({ message: "deleted", deletedCategory })

})

