import type { SignupFormErrors, SignUpFormValues } from "../types/FormTypes";

export function validateSignUpValues(values: SignUpFormValues): SignupFormErrors {
    const errors: SignupFormErrors = {};

    if (!values.name.trim()) {
        errors.name = "Enter your name";
    } else if (values.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters long";
    }

    if (!values.email.trim()) {
        errors.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email format";
    }

    if (!values.password) {
        errors.password = "Enter your password";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(values.password) || !/[0-9]/.test(values.password)) {
        errors.password = "Password must contain an uppercase letter and a number";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm your password";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}