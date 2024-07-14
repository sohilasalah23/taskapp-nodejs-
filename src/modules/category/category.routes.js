
import express from "express";
import { auth } from "../../middleware/auth.js";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "./category.controller.js";
import taskRoutes from "../task/task.routes.js";
import { validation } from "../../middleware/validation.js";
import { addCategorySchema, ByIdSchema, updateCategorySchema } from "./category.validation.js";




const categoryRoutes = express.Router()
categoryRoutes.use("/:category/task", taskRoutes)

categoryRoutes.route("/")
    .post(validation(addCategorySchema), auth, addCategory)
    .get(auth, getAllCategories)
categoryRoutes.route("/:id")
    .patch(validation(updateCategorySchema), auth, updateCategory)
    .delete(validation(ByIdSchema), auth, deleteCategory)








export default categoryRoutes