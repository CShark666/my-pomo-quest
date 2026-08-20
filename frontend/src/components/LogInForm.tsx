import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { loginUser } from "../userApi";
import type { LogInFormValues } from "../types/FormTypes";

type LogInFormProps = {
    logInAction: () => void
}

const initialValues: LogInFormValues = {
    email: "",
    password: ""
};

export function LogInForm({ logInAction }: LogInFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValues = { ...values, [name]: value };
        setValues(newValues);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            try {
                await loginUser({
                    email: values.email,
                    password: values.password
                })
                setErrors(null);
                logInAction();

            } catch (error) {
                setErrors(error instanceof Error ? error.message : "Unknown error")
            }
        })
    }

    return (
        <>
            <div className="flex-col justify-center fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-3">

                <h1 className="text-3xl font-bold">Log In</h1>

                <form onSubmit={handleSubmit} noValidate>

                    {/*email*/}
                    <div className="grid gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            className="input input-primary"
                            id="email"
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            disabled={isPending}
                        />
                        {errors !== null && <span style={{ color: "red" }}>{errors}</span>}
                    </div>

                    {/*password*/}
                    <div className="grid gap-1">

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                className="input input-primary"
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange}
                                disabled={isPending}
                            />
                            {errors !== null && <span style={{ color: "red" }}>{errors}</span>}
                        </div>

                        <span>
                            <input type="checkbox" className="checkbox"
                                onChange={(e) =>
                                    setShowPassword(e.target.checked)
                                }
                            /> Show password
                        </span>

                    </div>

                    <div >
                        <button className="btn btn-primary mt-2.5" type="submit" disabled={isPending}>
                            {isPending ? "Authorization..." : "Log in"}
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}