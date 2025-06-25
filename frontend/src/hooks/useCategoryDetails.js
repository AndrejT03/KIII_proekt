import {useEffect, useState} from "react";
import categoryRepository from "../repository/categoryRepository.js";

const useCategoryDetails = (id) => {
    const [category, setCategory] = useState(null);

    useEffect(() => {
        categoryRepository
            .findById(id)
            .then((response) => setCategory(response.data))
            .catch((error) => console.log(error));
    }, [id]);

    return category;
};

export default useCategoryDetails;