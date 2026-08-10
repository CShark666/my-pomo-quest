import { delay } from "./api";
import type { FormErrors } from "./types/FormTypes";
import type {
    UserData,
    ClientUser,
    UserRegistrationRequest,
    UserCredential,
    UserLoginRequest
} from './types/types';


export async function getUser(): Promise<ClientUser | null> {
    await delay();

    const currentUserId = getCurrentUserId();
    if (!currentUserId) return null;

    const dbUser = getUserData(currentUserId);
    if (!dbUser) return null;

    return {
        ...dbUser,
        level: 1
    }
}

export async function registerUser(request: UserRegistrationRequest): Promise<void> {
    await delay();

    const randomId = Math.floor(Math.random() * 9999999);

    saveUserData({
        id: randomId,
        login: request.login,
        experience: 0,
        completedQuests: 0
    })

    saveUserCredential({
        login: request.login,
        password: request.password,
        id: randomId
    });

    setCurrentUserId(randomId);
}

export async function loginUser(request: UserLoginRequest): Promise<FormErrors> {
    await delay();

    const userCredential = getUserCredential(request.login);

    const response: FormErrors = validateUserLoginRequest(request, userCredential!);

    if (Object.keys(response).length === 0) {
        setCurrentUserId(userCredential!.id);
    }

    return response;
}

export async function logOutUser() {
    await delay();
    return localStorage.removeItem("currentUserId");
}

function saveUserData(user: UserData) {
    localStorage.setItem(`${user.id}`, JSON.stringify(user))
}

function saveUserCredential(userCredential: UserCredential) {
    localStorage.setItem(userCredential.login, JSON.stringify(userCredential));
}

function setCurrentUserId(id: number) {
    localStorage.setItem("currentUserId", JSON.stringify(id))
}

function getCurrentUserId(): string | null {
    return localStorage.getItem("currentUserId");
}

function getUserData(currentUserId: string): UserData | null {
    const userData = localStorage.getItem(currentUserId);
    if (!userData) return null;

    return JSON.parse(userData) as UserData;
}

function getUserCredential(login: string): UserCredential | null {
    const data = localStorage.getItem(login);
    if (!data) return null;

    return JSON.parse(data) as UserCredential;
}

function validateUserLoginRequest(request: UserLoginRequest, userCredential: UserCredential): FormErrors {
    const errors: FormErrors = {};

    if (!userCredential) {
        errors.login = "Wrong login!";
        return errors;
    }

    if (request.password !== userCredential.password) errors.password = "Wrong password";

    return errors;
}