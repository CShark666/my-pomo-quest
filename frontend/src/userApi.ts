import { delay } from "./api";
import type {
    DbUser,
    ClientUser
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

export async function logOutUser() {
    await delay();
    return localStorage.removeItem("currentUserId");
}