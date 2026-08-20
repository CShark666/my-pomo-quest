import axios, { AxiosError } from "axios";
import type { SignupFormErrors } from "./types/FormTypes";
import type {
    ClientUser,
    UserRegistrationRequest,
    UserLoginRequest
} from './types/types';
import { validateSignUpValues } from "./util/validation";

interface ApiErrorResponse {
    error: string;
    code?: string;
}


export async function getUser(): Promise<ClientUser | null> {
    try {
        const response = await axios.get("/auth/me");
        console.log("Success:", response.data);

        return { ...response.data, level: 1 }

    } catch (err) {
        if (axios.isAxiosError<ApiErrorResponse>(err)) {
            if (err.response) {
                if (err.response.status === 401) {
                    return null;
                }

                const message = err.response.data?.error ?? "Something went wrong";
                throw new Error(message, { cause: err });
            }

            if (err.request) {
                throw new Error("No connection to the server", { cause: err });
            }
        }

        throw new Error("Unknown error", { cause: err });
    }
}

export async function signUpUser(request: UserRegistrationRequest): Promise<SignupFormErrors> {
    const errors: SignupFormErrors = validateSignUpValues(request);

    if (Object.keys(errors).length === 0) {

        const url = "/auth/register";
        const payload = {
            Email: request.email,
            Password: request.password
        };

        try {
            const response = await axios.post(url, payload);
            console.log("Success:", response.data);

        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
    return errors
}

export async function loginUser(request: UserLoginRequest) {
    try {
        const response = await axios.post("/auth/login", {
            Email: request.email,
            Password: request.password
        });
        console.log("Success:", response.data);

    } catch (err) {
        if (axios.isAxiosError<ApiErrorResponse>(err)) {

            if (err.response) {
                const message = err.response.data?.error ?? "Something went wrong";
                throw new Error(message, { cause: err });
            }

            if (err.request) {
                throw new Error("No connection to the server", { cause: err });
            }
        }
        throw new Error("Unknown error", { cause: err });
    }
}



export async function logOutUser() {
    try {
        const response = await axios.post("auth/logout");
        console.log("Success:", response.data);

    } catch (err) {
        if (axios.isAxiosError<ApiErrorResponse>(err)) {

            if (err.response) {
                const message = err.response.data?.error ?? "Something went wrong";
                throw new Error(message, { cause: err });
            }

            if (err.request) {
                throw new Error("No connection to the server", { cause: err });
            }
        }
        throw new Error("Unknown error", { cause: err });
    }
}