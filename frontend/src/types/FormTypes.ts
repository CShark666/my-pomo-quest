export interface SignUpFormValues {
    login: string;
    password: string;
}
export interface LogInFormValues {
    login: string;
    password: string;
}

export type FormErrors = Partial<
    Record<keyof SignUpFormValues, string> | Record<keyof LogInFormValues, string>>;