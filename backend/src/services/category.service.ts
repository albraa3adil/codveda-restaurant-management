import { randomUUID } from "crypto";
import { Category } from "../types/category.types.js";
import prisma from "../config/prisma.js";

const categories: Category[] = [];

export const createCategory = (name: string, description: string | null) => {

    return prisma.category.create({
        data: {
            name,
            description
        }
    });
};

export const getAllCategories = () => {
    return prisma.category.findMany({
        orderBy: {
            name: 'asc'
        }
    });
};

export const getCategoryById = (id: string) => {
    return prisma.category.findUnique({
        where: { id }
    });
};

export const updateCategory = async (id: string, name: string, description: string | null) => {
    const result = await prisma.category.updateMany({
        where: { id },
        data: {
            name,
            description
        }
    });

    if (result.count === 0) {
        return null;
    }

    return prisma.category.findUnique({
        where: { id }
    });
};

export const deleteCategory = async (id: string): Promise<boolean> => {
    const result = await prisma.category.deleteMany({
        where: { id }
    });

    return result.count > 0;
};