import React, { useState } from 'react';
import {Box, Button, CircularProgress, Grid, Typography} from "@mui/material";
import useCategories from '../../hooks/useCategories';
import useReminders from '../../hooks/useReminders';
import RemindersGrid from '../components/reminders/RemindersGrid/RemindersGrid.jsx';
import CategoryScroller from '../components/categories/CategoryScroller/CategoryScroller.jsx';
import AddReminderDialog from "../components/reminders/AddReminderDialog/AddReminderDialog.jsx";
import AddCategoryDialog from '../components/categories/AddCategoryDialog/AddCategoryDialog.jsx';
import EditCategoryDialog from '../components/categories/EditCategoryDialog/EditCategoryDialog.jsx';
import categoryRepository from "../../repository/categoryRepository.js";
import './RemindersPage.css';

const RemindersPage = () => {
    const { categories, fetchCategories, loading: categoriesLoading, onDelete} = useCategories();
    const { reminders, loading, onAdd, onDone } = useReminders();
    const [AddReminderDialogOpen, setAddReminderDialogOpen] = useState(false);
    const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
    const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    const handleOpenEditDialog = (category) => {
        console.log("1. Click handler fired. Category object received:", category);
        setCategoryToEdit(category);
        setEditCategoryDialogOpen(true);
    };

    const handleCloseDialogs = () => {
        setAddCategoryDialogOpen(false);
        setEditCategoryDialogOpen(false);
        setCategoryToEdit(null);
    };

    const handleAddCategory = (newCategoryData) => {
        categoryRepository.add(newCategoryData)
            .then(() => {
                console.log("Category added. Refreshing list...");
                fetchCategories();
            })
            .catch(err => console.error("Failed to add category", err));
    };

    const handleEditCategory = (id, updatedCategoryData) => {
        categoryRepository.edit(id, updatedCategoryData)
            .then(() => {
                console.log("Category updated. Refreshing list...");
                fetchCategories();
            })
            .catch(err => console.error("Failed to edit category", err));
    };

    return (
        <>
            <Box sx={{ p: 3,  width: '100%' }}>
                {loading && categoriesLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center',  mt: 3, alignItems: 'center', height: '80vh' }}>
                        <CircularProgress/>
                    </Box>
                )}
                {!loading && !categoriesLoading &&
                    <>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <CategoryScroller
                                categories={categories}
                                onAddCategoryClick={() => setAddCategoryDialogOpen(true)}
                                onCategoryClick={handleOpenEditDialog}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography variant="h5">
                                My Reminders:
                            </Typography>
                            <Button sx={{ mr: 7 }} variant="contained" color="primary" onClick={() => setAddReminderDialogOpen(true)}>
                                + Reminder
                            </Button>
                        </Box>
                        <Grid container spacing={2}>
                            <RemindersGrid reminders={reminders} onDone={onDone}/>
                        </Grid>
                    </>
                }
            </Box>
            <AddReminderDialog
                open={AddReminderDialogOpen}
                onClose={() => setAddReminderDialogOpen(false)}
                onAdd={onAdd}
            />
            <AddCategoryDialog
                open={addCategoryDialogOpen}
                onClose={handleCloseDialogs}
                onAdd={handleAddCategory}
            />
            <EditCategoryDialog
                open={editCategoryDialogOpen}
                onClose={() => setEditCategoryDialogOpen(false)}
                onEdit={handleEditCategory}
                category={categoryToEdit}
                onDelete={onDelete}
            />
        </>
    );
};

export default RemindersPage;