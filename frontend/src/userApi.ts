import axios from "axios";
import type {
    ClientUser,
    UserRegistrationRequest,
    UserLoginRequest
} from './types/types';


export async function getUser(): Promise<ClientUser | null> {
    try {
        const res = await axios.get("/auth/me");
        console.log("Success:", res.data);

        return { ...res.data, level: 1 }
    } catch {
        return null;
    }
}

export async function signUpUser(request: UserRegistrationRequest): Promise<void> {
    await axios.post("/auth/register", {
        Name: request.name,
        Email: request.email,
        Password: request.password,
        ConfirmPassword: request.confirmPassword,
    });
}

export async function loginUser(request: UserLoginRequest): Promise<void> {
    await axios.post("/auth/login", {
        Email: request.email,
        Password: request.password
    });
}

export async function logOutUser() {
    await axios.post("auth/logout");
}

axios.interceptors.response.use(
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
