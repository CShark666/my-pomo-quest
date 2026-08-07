export interface FormValues {
    login: string;
    password: string;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;