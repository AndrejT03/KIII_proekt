import {useCallback, useEffect, useState} from "react";
import reminderRepository from "../repository/reminderRepository.js";

const initialState = {
    "reminders": [],
    "loading": true,
};

const useReminders = () => {
    const [state, setState] = useState(initialState);

    const fetchReminders = useCallback(() => {
        setState(initialState);
        reminderRepository
            .findAll()
            .then((response) => {
                setState({
                    "reminders": response.data,
                    "loading": false,
                });
            })
            .catch((error) => console.log(error));
    }, []);

    const onAdd = useCallback((data) => {
        reminderRepository
            .add(data)
            .then(() => {
                console.log("Successfully added a new reminder.");
                fetchReminders();
            })
            .catch((error) => console.log(error));
    }, [fetchReminders]);

    const onEdit = useCallback((id, data) => {
        reminderRepository
            .edit(id, data)
            .then(() => {
                console.log(`Successfully edited the reminder with ID ${id}.`);
                fetchReminders();
            })
            .catch((error) => console.log(error));
    }, [fetchReminders]);

    const onDone = useCallback((id) => {
        reminderRepository
            .delete(id)
            .then(() => {
                console.log(`Successfully deleted the reminder with ID ${id}.`);
                fetchReminders();
            })
            .catch((error) => console.log(error));
    }, [fetchReminders]);

    useEffect(() => {
        fetchReminders();
    }, [fetchReminders]);

    return {...state, onAdd: onAdd, onEdit: onEdit, onDone: onDone};
};

export default useReminders;