import apiClient from "./apiClient";

const questClient = apiClient.create()

questClient.interceptors.response.use(
    (response) => {
        console.log(`Success quest: ${JSON.stringify(response.data, null, 2)}`)
        return response;
    },
    (err) => {
        const status = err.response?.status;
        const code = err.response?.data?.code;

        if (status === 404 && code === "NO_CURRENT_QUEST") {
            console.error(err.response?.data?.detail || "No current quest error");
            return Promise.resolve({ data: null });
        }
        console.error("API Error:", status ?? err.message);
        throw new Error(`API Error: ${status ?? "network"}`, { cause: err });
    }
);

export default questClient;
