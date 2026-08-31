import type {
    ClientUser,
    UserRegistrationRequest,
    UserLoginRequest
} from './types/types';
import { apiClient } from "./apiClient";


export async function getUser(): Promise<ClientUser | null> {
    try {
        const res = await apiClient.get("/auth/me");

        return { ...res.data, level: 1 }
    } catch {
        return null;
    }
}

export async function signUpUser(request: UserRegistrationRequest): Promise<void> {
    await apiClient.post("/auth/register", {
        Name: request.name,
        Email: request.email,
        Password: request.password,
        ConfirmPassword: request.confirmPassword,
    });
}

export async function loginUser(request: UserLoginRequest): Promise<void> {
    await apiClient.post("/auth/login", {
        Email: request.email,
        Password: request.password
    });
}

export async function logOutUser() {
    await apiClient.post("/auth/logout");
}