import { createCategory, deleteCategory, getCategories, updateCategory } from "./api.js";

const categoriesContainer = document.getElementById('categories-container');
const categoryCount = document.getElementById('category-count');

const categoryForm = document.getElementById('category-form');
const formTitle = document.getElementById('form-title');
const addCategoryBtn = document.getElementById('add-category-btn');
const cancelFormBtn = document.getElementById('cancel-form-btn');
const submitFormBtn = document.getElementById('submit-form-btn');

const categoryNameInput = document.getElementById('category-name');
const categoryDescriptionInput = document.getElementById('category-description');

const feedbackMessage = document.getElementById('feedback-message');

let editingCategoryId = null;
let currentCategories = [];

// FeedBack Message
const showFeedback = (message, type) => {
    feedbackMessage.className = `feedback-message ${type}`;
    feedbackMessage.textContent = message;
    feedbackMessage.hidden = false;
};

const hideFeedBack = () => {
    feedbackMessage.textContent = '';
    feedbackMessage.hidden = true;
};

// Rendering Categories
const renderCategories = (categories) => {
    currentCategories = categories;
    categoriesContainer.replaceChildren();

    categoryCount.textContent = `${categories.length} ${categories.length === 1 ? 'category' : 'categories'}`;

    if (categories.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No categories found. Add your first category.'

        categoriesContainer.appendChild(emptyMessage)
        return;
    }

    categories.forEach((category) => {
        const card = document.createElement('div');
        card.className = 'category-card';

        const name = document.createElement('h4');
        name.textContent = category.name;

        const description = document.createElement('p');
        description.textContent = category.description || 'No description provided.';

        const actions = document.createElement('div');
        actions.className = 'category-card-actions';

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'btn btn-secondary';
        editButton.textContent = 'Edit';
        editButton.dataset.action = 'edit';
        editButton.dataset.categoryId = category.id;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.action = 'delete';
        deleteButton.dataset.categoryId = category.id;

        actions.append(editButton, deleteButton);
        card.append(name, description, actions);

        categoriesContainer.appendChild(card);
    });
};

// Load categories
const loadCategories = async () => {
    categoriesContainer.textContent = 'Loading categories...'
    categoriesContainer.className = 'categories-container'
    try {
        const response = await getCategories();

        if (!response.success || !Array.isArray(response.data)) {
            throw new Error('Invalid respones received from the server');
        }

        renderCategories(response.data);
    } catch (error) {
        console.log('Failed to load categories: ', error);

        categoryCount.textContent = 'Unable to load categories';

        const errorMessage = document.createElement('p');
        errorMessage.className = 'empty-message'
        errorMessage.textContent = error.message || 'Something went wrong while loading categories.';

        categoriesContainer.replaceChildren(errorMessage);
    }
};

// Form
const openCategoryForm = () => {
    hideFeedBack();

    editingCategoryId = null;
    categoryForm.reset();

    formTitle.textContent = 'Add Category';
    submitFormBtn.textContent = 'Save Category';

    categoryForm.hidden = false;
    categoryNameInput.focus();
};

const openEditForm = (categoryId) => {
    const category = currentCategories.find((category) => category.id === categoryId);

    if (!category) {
        showFeedback('Category not found.', 'error');
        return;
    }

    hideFeedBack();

    editingCategoryId = category.id;

    categoryNameInput.value = category.name;
    categoryDescriptionInput.value = category.description ?? '';

    formTitle.textContent = 'Edit Category';
    submitFormBtn.textContent = 'Update Category';

    categoryForm.hidden = false;

    categoryForm.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    })
    categoryNameInput.focus();
};

const closeCategoryForm = () => {
    categoryForm.reset();

    editingCategoryId = null;

    formTitle.textContent = 'Add Category';
    submitFormBtn.textContent = 'Save Category';

    categoryForm.hidden = true;
};

// Event Listeners
// ================

// open form
addCategoryBtn.addEventListener('click', openCategoryForm);

// close form
cancelFormBtn.addEventListener('click', closeCategoryForm);

// Create Category
// submit form
submitFormBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    hideFeedBack();

    console.log(categoryForm.target.value);
    const categoryData = {
        name: categoryNameInput.value.trim(),
        description: categoryDescriptionInput.value.trim() || null
    };

    if (categoryData.name.length < 2) {
        showFeedback(
            'Category name must contain at least 2 characters.',
            'error'
        );

        categoryNameInput.focus();
        return;
    }

    const isEditing = editingCategoryId !== null;

    submitFormBtn.disabled = true;
    submitFormBtn.textContent = isEditing ? 'Updating...' : 'Saving...'

    try {
        const response = isEditing ? await updateCategory(editingCategoryId, categoryData) : await createCategory(categoryData);

        if (!response.success) {
            console.log('response.message', response.message);
            throw new Error(response.message || 'Operation failed')
        }

        closeCategoryForm();
        showFeedback(isEditing ? 'Category updated successfully.' : 'Category created successfully.', 'success');

        await loadCategories();
    } catch (error) {
        console.error('Failed to save category: ', error);

        const message = error.details?.length
            ? error.details.map((item) => item.message).join('. ')
            : error.message || `Something went wrong while saving the category.`;

        showFeedback(message, 'error');
    } finally {
        submitFormBtn.disabled = false;
        submitFormBtn.textContent = 'Save Category';

    }
});

categoriesContainer.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');

    if (!button) {
        return;
    }

    const categoryId = button.dataset.categoryId;

    if (button.dataset.action === 'edit') {
        openEditForm(categoryId);
    }

    if (button.dataset.action === 'delete') {
        handleDeleteCategory(categoryId, button);
    }
});

const handleDeleteCategory = async (categoryId, button) => {
    const category = currentCategories.find((category) => category.id === categoryId);

    if (!category) {
        showFeedback('Category not found', 'error')
        return;
    }

    const confirmed =  window.confirm(`Are you sure you want to delete "${category.name}"?`);

    if (!confirmed) {
        return;
    }

    button.disabled = true;
    button.textContent = 'Deleting...';

    try {
        const response = await deleteCategory(categoryId);

        if (!response.success) {
            throw new Error(response.message || 'Failed to delete category');
        }

        showFeedback('Category deleted successfully.', 'success');

        await loadCategories();
    } catch (error) {
        console.error('Failed to delete category: ', error);
        showFeedback(error.message || 'Something went wrong while deleting the category', 'error');

        button.disabled = false;
        button.textContent = 'Delete';
    }
};

loadCategories();