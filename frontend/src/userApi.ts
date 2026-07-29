import { delay } from "./api";
import type {
    DbUser,
    ClientUser,
    UserRegistrationRequest
} from './types/types';


export async function getUser(): Promise<ClientUser | null> {
    await delay();

    const currentUserId = localStorage.getItem("currentUserId");
    if (!currentUserId) return null;

    const userData = localStorage.getItem(currentUserId);
    if (!userData) return null;

    const dbUser = JSON.parse(userData) as DbUser;

    return {
        ...dbUser,
        level: 1
    }
}

export async function registerUser(request: UserRegistrationRequest): Promise<void> {
    await delay();

    const randomId = Math.floor(Math.random() * 9999999);

    saveDbUser({
        id: randomId,
        login: request.login,
        password: request.password,
        experience: 0,
        completedQuests: 0
    })
    setCurrentUserId(randomId);
}

export async function logOutUser() {
    await delay();
    return localStorage.removeItem("currentUserId");
}

function saveDbUser(user: DbUser) {
    localStorage.setItem(`${user.id}`, JSON.stringify(user))
}

function setCurrentUserId(id: number) {
    localStorage.setItem("currentUserId", JSON.stringify(id))
}