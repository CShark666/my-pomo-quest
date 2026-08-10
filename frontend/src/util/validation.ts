import type { FormErrors, SignUpFormValues } from "../types/FormTypes";

export function validateSignUpValues(values: SignUpFormValues): FormErrors {
    const errors: FormErrors = {};

    if (!values.login.trim()) {
        errors.login = "Enter your login";
    } else if (values.login.trim().length < 3) {
        errors.login = "Login must be at least 3 characters long";
    }

    if (!values.password) {
        errors.password = "Enter your password";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(values.password) || !/[0-9]/.test(values.password)) {
        errors.password = "Password must contain an uppercase letter and a number";
    }

    return errors;
}