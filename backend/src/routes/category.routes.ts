import { Router } from "express";
import {
    createCategoryHandler,
    deleteCategoryHandler,
    getAllCategoriesHandler,
    getCategoryByIdHandler,
    updateCategoryHandler
} from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../validators/category.validator.js";

const router = Router();

router.post("/", validate(createCategorySchema), createCategoryHandler);
router.get("/", getAllCategoriesHandler);
router.get("/:id", getCategoryByIdHandler);
router.put("/:id", validate(updateCategorySchema), updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

export default router;