import React, { useState, useEffect } from 'react';
import { Box, Card, CardActionArea, CardContent, Radio, Typography, Chip } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useNavigate} from 'react-router';

const ReminderCard = ({reminder, onDone}) => {
    const navigate = useNavigate();
    const [isMarkingDone, setIsMarkingDone] = useState(false);

    useEffect(() => {
        let timerId;
        if (isMarkingDone) {
            timerId = setTimeout(() => {
                onDone(reminder.id);
            }, 3000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isMarkingDone, onDone, reminder.id]);

    const handleDoneClick = (event) => {
        event.stopPropagation();
        setIsMarkingDone(true);
    };
    const handleCardClick = () => {
        if (isMarkingDone) return;
        navigate(`/reminder/${reminder.id}`);
    };
    const formattedDueDate = reminder.dueDate
        ? new Date(reminder.dueDate).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
        : 'No due date';

    return (
        <>
            <Card sx={{ boxShadow: 3, borderRadius: 2, display: 'flex', alignItems: 'center', transition: 'opacity 0.5s ease-in-out', opacity: isMarkingDone ? 0.5 : 1 }}>
                {!reminder.completed && (
                    <Radio
                        checked={isMarkingDone}
                        disabled={isMarkingDone}
                        onClick={handleDoneClick}
                        sx={{ p: 2 }}
                    />
                )}
                <CardActionArea onClick={handleCardClick} sx={{ flexGrow: 1 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="h5" component="div" sx={{ color: isMarkingDone ? 'text.disabled' : 'text.primary' }}>
                                {reminder.title}
                            </Typography>
                            {reminder.priority === 1 && (
                                <Chip
                                    label={reminder.completed ? "Completed" : "High Priority"}
                                    color={reminder.completed ? "success" : "error"}
                                    size="small"
                                />
                            )}
                        </Box>
                        {reminder.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, color: isMarkingDone ? 'text.disabled' : 'text.secondary' }}>
                                {reminder.description}
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            {reminder.dueDate && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isMarkingDone ? 'text.disabled' : 'inherit' }}>
                                    <AccessTimeIcon fontSize="small" color="action" />
                                    <Typography variant="body2">{formattedDueDate}</Typography>
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export default ReminderCard;