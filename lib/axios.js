import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://medicare-pro-backend.vercel.app/api/v1",
});

export default axiosInstance;
