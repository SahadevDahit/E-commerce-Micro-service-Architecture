import exppress from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryByName,
    updateCategory,
    deleteCategory,
} from "../controllers/category.js";


const categoriesRouter = exppress.Router();

categoriesRouter.post(
    "/",
    createCategory
);
categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:name", getCategoryByName);
categoriesRouter.delete("/:id", deleteCategory);
categoriesRouter.put("/:id", updateCategory);
export default categoriesRouter;