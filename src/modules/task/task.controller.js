import taskModel from "../../../Database/models/task.model.js"
import { handleAsynError } from "../../middleware/handleAsyncError.js"
import apiFeature from "../../utils/apiFeatures.js"
import { appError } from "../../utils/appError.js"


/* A D D     T A S K   */
export const addCTask = handleAsynError(async (req, res) => {
    let { title, status, type, category } = req.body
    let preTask = new taskModel({ title, status, type, category, user: req.userId })
    let addedTask = await preTask.save()
    res.json({ message: "added", addedTask })
})
// /* G E T    A L L       T A S K    F O R    S P E C I F I C     u S E R */
export const getAllTasks = handleAsynError(async (req, res) => {
    let filterObj = {}
    if (req.params.category) {
        filterObj.category = req.params.category
        filterObj.user = req.userId
        let allTasks = await taskModel.find(filterObj).populate("category")
        if (allTasks) return res.json({ message: "done", allTasks })
    }
    let apiFeatures = new apiFeature(taskModel.find({ user: req.userId }), req.query).pagination().filter()
    let allTasks = await apiFeatures.mongooseQuery;
    res.json({ message: "done", page: apiFeatures.page, allTasks })

})

// /*  U P D A T E        T A S K   */
export const updateTask = handleAsynError(async (req, res, next) => {
    let foundedTask = await taskModel.findById(req.params.id)
    if (!foundedTask) return next(new appError(`not found task`, 409))
    if (foundedTask.user != req.userId) return next(new appError(`u are not creator`, 409))
    let updatedTask = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    updatedTask && res.json({ message: "done", updatedTask })
})

/*  D E L E T E        C A T E G O R Y  */
export const deleteTask = handleAsynError(async (req, res, next) => {
    let foundedTask = await taskModel.findById(req.params.id)
    if (!foundedTask) return next(new appError(`not found task`, 409))
    if (foundedTask.user != req.userId) return next(new appError(`u are not creator`, 409))
    let deletedTask = await taskModel.findByIdAndDelete(req.params.id)
    deletedTask && res.json({ message: "deleted", deletedTask })

})

