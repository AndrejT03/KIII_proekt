import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router";
import { Box, Button, Chip, CircularProgress, Divider, Paper, Stack, Typography, Breadcrumbs, Link } from "@mui/material";
import { ArrowBack, Category, Edit, CheckCircleOutline, CalendarToday, LowPriority, AccessTime } from "@mui/icons-material";
import useReminderDetails from "../../../../hooks/useReminderDetails.js";
import reminderRepository from "../../../../repository/reminderRepository.js";
import EditReminderDialog from "../../../components/reminders/EditReminderDialog/EditReminderDialog.jsx";

const ReminderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { reminder, onEdit } = useReminderDetails(id) || {};
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleSetAsDone = () => {
        reminderRepository
            .delete(reminder.id)
            .then(() => {
                console.log(`Successfully marked reminder ${reminder.id} as done.`);
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    if (!reminder) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return "Not set";
        return new Date(dateString).toLocaleString('en-GB', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <>
            <Box>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/");
                        }}
                    >
                        Reminders
                    </Link>
                    <Typography color="text.primary">{reminder.title}</Typography>
                </Breadcrumbs>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 600 }}>
                            {reminder.title}
                        </Typography>
                        <Chip
                            label={reminder.completed ? "Completed" : "Pending"}
                            color={reminder.completed ? "success" : "default"}
                        />
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {reminder.description || "No description provided."}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CalendarToday color="action" />
                            <Typography variant="body1"><strong>Due Date:</strong> {formatDate(reminder.dueDate)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LowPriority color="action" />
                            <Typography variant="body1"><strong>Priority:</strong> {reminder.priority===1 ? "High" : "Low" }</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Category color="action" />
                            <Typography variant="body1"><strong>Category:</strong> { reminder.categoryName }</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <AccessTime color="action" />
                            <Typography variant="body1"><strong>Created:</strong> {formatDate(reminder.createdAt)}</Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Edit />}
                                size="large"
                                onClick={() => setEditDialogOpen(true)}
                            >
                                Edit
                            </Button>
                            {!reminder.completed && (
                                <Button
                                    variant="outlined"
                                    color="success"
                                    startIcon={<CheckCircleOutline />}
                                    size="large"
                                    onClick={handleSetAsDone}
                                >
                                    Set as Done
                                </Button>
                            )}
                        </Stack>
                        <Button
                            variant="text"
                            startIcon={<ArrowBack />}
                            onClick={() => navigate("/")}
                        >
                            Back to List
                        </Button>
                    </Stack>
                </Paper>
            </Box>

            {reminder && (
                <EditReminderDialog
                    open={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                    reminder={reminder}
                    onEdit={onEdit}
                />
            )}
        </>
    );
};

export default ReminderDetails;