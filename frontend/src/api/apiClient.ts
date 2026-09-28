import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5059",
    timeout: 5000,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "XSRF-TOKEN",
    withXSRFToken: true,
});

apiClient.interceptors.request.use((config) => {
    const csrfToken = getCookie("XSRF-TOKEN");
    if (csrfToken && config.headers) {
        config.headers["XSRF-TOKEN"] = csrfToken;
    }
    return config;
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

export default apiClient;

function getCookie(name: string): string | null {
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
}