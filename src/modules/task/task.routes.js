
import express from "express";
import { auth } from "../../middleware/auth.js";
import { addCTask, deleteTask, getAllTasks, updateTask } from "./task.controller.js";
import { validation } from "../../middleware/validation.js";
import { addSchema, ByIdSchema, updateSchema } from "./task.validation.js";




const taskRoutes = express.Router({ mergeParams: true })

taskRoutes.route("/")
    .post(validation(addSchema), auth, addCTask)
    .get(auth, getAllTasks)
taskRoutes.route("/:id")
    .patch(validation(updateSchema), auth, updateTask)
    .delete(validation(ByIdSchema), auth, deleteTask)








export default taskRoutes