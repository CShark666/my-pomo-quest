import apiClient from "./apiClient";

const questClient = apiClient.create()

questClient.interceptors.response.use(
    (response) => {
        console.log(`Success quest: ${JSON.stringify(response.data, null, 2)}`)
        return response;
    },
    (err) => {
        if (err.response?.status === 404) {
            console.error("No current quest");
        } else {
            console.error("API Error:", err.response?.status || err.message);
        }
        return Promise.resolve({ data: null });
    }
);

export default questClient;
