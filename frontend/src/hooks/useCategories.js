import {useCallback, useEffect, useState} from "react";
import categoryRepository from "../repository/categoryRepository.js";

const initialState = {
    "categories": [],
    "loading": true,
};

const useCategories = () => {
    const [state, setState] = useState(initialState);
    
    const fetchCategories = useCallback(() => {
        setState(initialState);
        categoryRepository
            .findAll()
            .then((response) => {
                setState({
                    "categories": response.data,
                    "loading": false,
                });
            })
            .catch((error) => console.log(error));
    }, []);

    const onAdd = useCallback((data) => {
        categoryRepository
            .add(data)
            .then(() => {
                console.log("Successfully added a new category.");
                fetchCategories();
            })
            .catch((error) => console.log(error));
    }, [fetchCategories]);

    const onEdit = useCallback((id, data) => {
        categoryRepository
            .edit(id, data)
            .then(() => {
                console.log(`Successfully edited the category with ID ${id}.`);
                fetchCategories();
            })
            .catch((error) => console.log(error));
    }, [fetchCategories]);

    const onDelete = useCallback((id) => {
        categoryRepository
            .delete(id)
            .then(() => {
                console.log(`Successfully deleted the category with ID ${id}.`);
                fetchCategories();
            })
            .catch((error) => console.log(error));
    }, [fetchCategories]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {...state, fetchCategories, onAdd: onAdd, onEdit: onEdit, onDelete: onDelete};
};

export default useCategories;