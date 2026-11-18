import { API_BASE_URL } from "./config.js";

const request = async (endpoint, options = {}) => {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        }
    );

    const data = response.json().catch(() => null)

    if (!response.ok) {
        const error = new Error(data?.message || `Request failed with status ${response.status}`);

        error.details = data?.errors || [];
        error.status = response.status;

        throw error;
    }

    return data;
};

export const getCategories = async () => {
    return request('/categories');
};

export const createCategory = async (categoryData) => {
    return request('/categories', {
        method: 'POST',
        body: JSON.stringify(categoryData)
    });
};

export const updateCategory = async (id, categoryData) => {
    return request(`/categories/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(categoryData)
    });
};

export const deleteCategory = async (id) => {
    return request(`/categories/${encodeURIComponent(id)}`, {
        method: 'DELETE',
    });
};