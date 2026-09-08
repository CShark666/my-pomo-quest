import axios from "axios";

const questClient = axios.create({
    baseURL: "http://localhost:5059",
    timeout: 5000,
    withCredentials: true
})

questClient.interceptors.response.use(
    (response) => {
        console.log(`Success quest: ${JSON.stringify(response.data, null, 2)}`)
        return response;
    },
    (err) => {
        if (err.response?.status === 404) {
            console.error("API Error. No quest");
        } else {
            console.error("API Error:", err.response?.status || err.message);
        }
        return Promise.resolve({ data: null });
    }
);

export default questClient;
