export type userRegisterRequest = {
    name: string,
    login: string,
    password: string
}

export type DbUser = userRegisterRequest & {
    createdAt: number,
    experience: number,
    compliedQuests: number
}