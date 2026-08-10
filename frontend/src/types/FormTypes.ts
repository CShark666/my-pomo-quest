export interface RegistrationFormValues {
    login: string;
    password: string;
}
export interface LogInFormValues {
    login: string;
    password: string;
}

export type FormErrors = Partial<
    Record<keyof RegistrationFormValues, string> | Record<keyof LogInFormValues, string>>;