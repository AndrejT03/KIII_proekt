import axiosInstance from "../axios/axios.js";

const reminderRepository = {
    findAll: async () => {
        return await axiosInstance.get("/reminders");
    },
    findById: async (id) => {
        return await axiosInstance.get(`/reminders/${id}`);
    },
    add: async (data) => {
        return await axiosInstance.post("/reminders/add", data);
    },
    edit: async (id, data) => {
        return await axiosInstance.put(`/reminders/update/${id}`, data);
    },
    delete: async (id) => {
        return await axiosInstance.delete(`/reminders/${id}/done`);
    },
};

export default reminderRepository;