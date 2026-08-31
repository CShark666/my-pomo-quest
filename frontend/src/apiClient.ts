import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:5059",
    timeout: 5000,
    withCredentials: true
});

apiClient.interceptors.response.use(
    (response) => {
        console.log("Success:", response.data);
        return response;
    },
    (err) => {
        if (axios.isAxiosError(err)) {
            const message = err.response?.data?.message || err.message || "Request error.";
            throw new Error(message, { cause: err });
        }
        throw new Error("Unknown error.", { cause: err });
    }
);