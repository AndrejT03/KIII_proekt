import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import useCategories from "../../../../hooks/useCategories";

const initialFormData = {
    title: "",
    description: "",
    dueDate: "",
    priority: "0",
    categoryId: ""
};

const AddReminderDialog = ({ open, onClose, onAdd }) => {
    const [formData, setFormData] = useState(initialFormData);
    const { categories, loading: categoriesLoading } = useCategories();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const reminderDataToAdd = {
            ...formData,
            priority: parseInt(formData.priority, 10),
            categoryId: parseInt(formData.categoryId, 10),
            dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        };

        onAdd(reminderDataToAdd);
        setFormData(initialFormData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Reminder</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
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
                <TextField
                    margin="dense"
                    name="dueDate"
                    label="Due Date"
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
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
                    <Select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        label="Category"
                        variant="outlined"
                        disabled={categoriesLoading}
                        required
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Add Reminder
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddReminderDialog;