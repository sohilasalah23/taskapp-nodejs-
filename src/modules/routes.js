import categoryRoutes from "./category/category.routes.js"
import taskRoutes from "./task/task.routes.js"
import userRoutes from "./user/user.routes.js"


export const allRoutes = (app) => {
    app.use("/api/v1/user", userRoutes)
    app.use("/api/v1/task", taskRoutes)
    app.use("/api/v1/category", categoryRoutes)


}