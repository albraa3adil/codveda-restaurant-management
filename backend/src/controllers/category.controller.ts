import { Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../services/category.service";

export const createCategoryHandler = (req: Request, res: Response): void => {
    const { name, description } = req.body;

    const category = createCategory(name, description ?? null);

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category
    });
};

export const getAllCategoriesHandler = (_req: Request, res: Response): void => {
    const categories = getAllCategories();

    res.status(200).json({
        success: true,
        data: categories
    });
};

export const getCategoryByIdHandler = (req: Request, res: Response): void => {
    const id: string = String(req.params.id);

    const category = getCategoryById(id);

    if (!category) {
        res.status(404).json({
            success: false,
            message: "Category not found"
        });
        return;
    }

    res.status(200).json({
        success: true,
        data: category
    });
};

export const updateCategoryHandler = (req: Request, res: Response): void => {
    const id: string = String(req.params.id);
    const { name, description } = req.body;

    const category = updateCategory(id, name, description);

    if (!category) {
        res.status(404).json({
            success: false,
            message: "Category not found"
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: category
    });
};

export const deleteCategoryHandler = (req: Request, res: Response): void => {
    const id: string = String(req.params.id);

    const deleted = deleteCategory(id);

    if (!deleted) {
        res.status(404).json({
            success: false,
            message: "Category not found"
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
};