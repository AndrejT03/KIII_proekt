import React, { useState, useEffect } from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

const EditCategoryDialog = ({ open, onClose, onEdit, category, onDelete }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || ''
            });
        } else {
            setFormData({ name: '', description: '' });
        }
    }, [category, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (!category) return;
        onEdit(category.id, formData);
        onClose();
    };

    const handleDelete = () => {
        if (!category) return;
        onDelete(category.id);
        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Category:</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Category Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions  sx={{ p: '16px 24px', justifyContent: 'space-between' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Box>
                    <Button onClick={handleDelete} variant="contained" color="error" sx={{ mr: 1}}>Delete</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">Edit</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategoryDialog;