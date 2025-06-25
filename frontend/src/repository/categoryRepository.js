import axiosInstance from "../axios/axios.js";

const categoryRepository = {
    findAll: async () => {
        return await axiosInstance.get("/categories");
    },
    findById: async (id) => {
        return await axiosInstance.get(`/categories/${id}`);
    },
    add: async (data) => {
        return await axiosInstance.post("/categories/add", data);
    },
    edit: async (id, data) => {
        return await axiosInstance.put(`/categories/update/${id}`, data);
    },
    delete: async (id) => {
        return await axiosInstance.delete(`/categories/delete/${id}`);
    },
};

export default categoryRepository;