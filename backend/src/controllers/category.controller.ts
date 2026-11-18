import { Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../services/category.service.js";

export const createCategoryHandler = async (req: Request, res: Response): Promise<void> => {
    const { name, description } = req.body;

    const category = await createCategory(name, description ?? null);

    res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category
    });
};

export const getAllCategoriesHandler = async(_req: Request, res: Response): Promise<void> => {
    const categories = await getAllCategories();

    res.status(200).json({
        success: true,
        data: categories
    });
};

export const getCategoryByIdHandler = async (req: Request, res: Response): Promise<void> => {
    const id: string = String(req.params.id);

    const category = await getCategoryById(id);

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

export const updateCategoryHandler = async (req: Request, res: Response): Promise<void> => {
    const id: string = String(req.params.id);
    const { name, description } = req.body;

    const category = await updateCategory(id, name, description);

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

export const deleteCategoryHandler = async (req: Request, res: Response): Promise<void> => {
    const id: string = String(req.params.id);

    const deleted = await deleteCategory(id);

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