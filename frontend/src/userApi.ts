import { delay } from "./api";
import type {
    userRegisterRequest,
    DbUser
} from './types/userTypes';

const STORAGE_KEY = "user";


export async function registerUser(request: userRegisterRequest): Promise<DbUser | void> {
    await delay()

    saveNewUserDb({
        name: request.name,
        login: request.login,
        password: request.password,
        createdAt: Date.now(),
        experience: 0,
        compliedQuests: 0
    });

    return getUserDb();
}

function saveNewUserDb(user: DbUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

function getUserDb(): DbUser {
    const data = localStorage.getItem(STORAGE_KEY);
    const user = JSON.parse(data!) as DbUser;

    return user;
}