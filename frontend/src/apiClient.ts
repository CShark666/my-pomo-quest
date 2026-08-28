import axios from "axios";

export const apiClient = axios.create({
    baseURL: "/auth",
    timeout: 5000
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