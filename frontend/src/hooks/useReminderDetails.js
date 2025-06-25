import { useState, useEffect, useCallback } from "react";
import reminderRepository from "../repository/reminderRepository.js";

const useReminderDetails = (id) => {
    const [reminder, setReminder] = useState(null);

    const fetchReminder = useCallback(() => {
        reminderRepository
            .findById(id)
            .then((response) => setReminder(response.data))
            .catch((error) => console.log(error));
    }, [id]);

    useEffect(() => {
        fetchReminder();
    }, [fetchReminder]);

    const handleEdit = useCallback((reminderId, updatedData) => {
        return reminderRepository.edit(reminderId, updatedData)
            .then(response => {
                setReminder(response.data);
                return response;
            });
    }, []);

    return { reminder, onEdit: handleEdit };
};

export default useReminderDetails;