import { useState } from "react";

export function LogInForm() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>

            <div className="flex-col justify-center fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-3">

                <h1>LogIn</h1>

                <div className="grid gap-1">
                    <input className="input input-primary" type="text" placeholder="Name" required />
                    <input className="input input-primary" type={showPassword ? "text" : "password"} placeholder="Password" required />
                    <span>
                        <input type="checkbox" className="checkbox"
                            onChange={(e) =>
                                setShowPassword(e.target.checked)
                            } /> Show password
                    </span>
                </div>

                <div>
                    <button className="btn btn-primary">
                        Log In
                    </button>
                </div>

            </div>
        </>
    );
}