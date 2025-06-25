// src/ui/components/categories/EditCategoryDialog.jsx
import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box
} from "@mui/material";

const CategoryDetails = ({ open, onClose, category, onEdit, onDelete }) => {
    // Initialize form data state
    const [formData, setFormData] = useState({ name: '', description: '' });

    // Use useEffect to update form data when the category prop changes
    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || '',
            });
        }
    }, [category]);

    // Handler for input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handler for the "Edit" button
    const handleEdit = () => {
        onEdit(category.id, formData);
        onClose(); // Close the dialog after submission
    };

    // Handler for the "Delete" button
    const handleDelete = () => {
        // You might want to add a confirmation step here in a real app
        onDelete(category.id);
        onClose(); // Close the dialog after deletion
    };

    // Don't render if there's no category
    if (!category) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Category Name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </DialogContent>
            <DialogActions sx={{ padding: '16px 24px' }}>
                {/* Delete button is pushed to the left */}
                <Button onClick={handleDelete} color="error">
                    Delete
                </Button>
                {/* Spacer to push Cancel and Edit buttons to the right */}
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleEdit} variant="contained" color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryDetails;