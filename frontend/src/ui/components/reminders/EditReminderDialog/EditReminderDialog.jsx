import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import useCategories from "../../../../hooks/useCategories.js";

const EditReminderDialog = ({ open, onClose, reminder, onEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 0,
        categoryId: ''
    });

    const { categories } = useCategories();

    useEffect(() => {
        if (reminder) {
            const formattedDueDate = reminder.dueDate ? reminder.dueDate.slice(0, 16) : '';
            setFormData({
                title: reminder.title || '',
                description: reminder.description || '',
                dueDate: formattedDueDate,
                priority: reminder.priority || 0,
                categoryId: reminder.categoryId || ''
            });
        }
    }, [reminder, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onEdit(reminder.id, formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Reminder</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth variant="outlined" />
                <TextField margin="dense" label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={4} variant="outlined" />
                <TextField margin="dense" label="Due Date" name="dueDate" type="datetime-local" value={formData.dueDate} onChange={handleChange} fullWidth variant="outlined" InputLabelProps={{ shrink: true }} />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Priority</InputLabel>
                    <Select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        label="Priority"
                        variant="outlined"
                    >
                        <MenuItem value={0}>Low</MenuItem>
                        <MenuItem value={1}>High</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Category</InputLabel>
                    <Select name="categoryId" value={formData.categoryId} onChange={handleChange} label="Category" variant="outlined">
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditReminderDialog;