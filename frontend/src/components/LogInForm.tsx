import { useState, useTransition } from "react";
import { loginUser } from "../userApi";
import { LoadingSpinnerLabel } from "./Loading";

type LogInFormProps = {
    logInAction: () => void
}

export function LogInForm({ logInAction }: LogInFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleLogIn = () => startTransition(async () => {
        const response = await loginUser({
            login,
            password
        })
        setLogin("")
        setPassword("")

        if (response) {
            logInAction();
        };
    })

    return (
        <>

            <div className="flex-col justify-center fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-3">

                <h1>LogIn</h1>

                <div className="grid gap-1">
                    <input className="input input-primary" type="text" placeholder="Name" value={login} onChange={(e) => { setLogin(e.target.value) }} disabled={isPending} required />
                    <input className="input input-primary" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} disabled={isPending} required />
                    <span>
                        <input type="checkbox" className="checkbox"
                            onChange={(e) =>
                                setShowPassword(e.target.checked)
                            } /> Show password
                    </span>
                </div>

                <div>
                    <button className="btn btn-primary" onClick={handleLogIn} disabled={isPending}>
                        Log In
                    </button>
                </div>
                <div>
                    {isPending && <LoadingSpinnerLabel />}
                </div>
            </div>
        </>
    );
}