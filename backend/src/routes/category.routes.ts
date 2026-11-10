import { Router } from "express";
import {
    createCategoryHandler,
    deleteCategoryHandler,
    getAllCategoriesHandler,
    getCategoryByIdHandler,
    updateCategoryHandler
} from "../controllers/category.controller";
import { validate } from "../middlewares/validate.middleware";
import { createCategorySchema, updateCategorySchema } from "../validators/category.validator";

const router = Router();

router.post("/", validate(createCategorySchema), createCategoryHandler);
router.get("/", getAllCategoriesHandler);
router.get("/:id", getCategoryByIdHandler);
router.put("/:id", validate(updateCategorySchema), updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

export default router;