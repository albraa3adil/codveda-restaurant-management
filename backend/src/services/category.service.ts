import { randomUUID } from "crypto";
import { Category } from "../types/category.types";

const categories: Category[] = [];

export const createCategory = (name: string, description: string | null): Category => {
    const category: Category = {
        id: randomUUID(),
        name,
        description
    };

    categories.push(category);

    return category;
};

export const getAllCategories = (): Category[] => {
    return categories;
};

export const getCategoryById = (id: string): Category | undefined => {
    return categories.filter((category) => category.id === id)[0];
};

export const updateCategory = (id: string, name: string, description: string | null): Category | undefined => {
    const category: Category = categories.filter((category) => category.id === id)[0];

    if (!category) {
        return undefined;
    }

    category.name = name;
    category.description = description;

    return category;
};

export const deleteCategory = (id: string): Boolean => {
    const categoryIndex: number = categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) {
        return false;
    }

    categories.splice(categoryIndex, 1);

    return true;
};