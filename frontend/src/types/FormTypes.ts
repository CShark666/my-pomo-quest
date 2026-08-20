export interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface LogInFormValues {
    email: string;
    password: string;
}

export type FormErrors = Partial<
    Record<keyof SignUpFormValues, string> | Record<keyof LogInFormValues, string>>;

export type SignupFormErrors = Partial<Record<keyof SignUpFormValues, string>>;
export type LogInFormErrors = Partial<Record<keyof LogInFormValues, string>>;