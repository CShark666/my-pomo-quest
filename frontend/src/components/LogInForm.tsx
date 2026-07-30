import { useState } from "react";
import { loginUser } from "../userApi";
import { useNavigate } from "react-router";

export function LogInForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogIn = async () => {
        const response = await loginUser({
            login,
            password
        })
        setLogin("")
        setPassword("")
        if (response) navigate("/user/");
    }

    return (
        <>

            <div className="flex-col justify-center fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-3">

                <h1>LogIn</h1>

                <div className="grid gap-1">
                    <input className="input input-primary" type="text" placeholder="Name" value={login} onChange={(e) => { setLogin(e.target.value) }} required />
                    <input className="input input-primary" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                    <span>
                        <input type="checkbox" className="checkbox"
                            onChange={(e) =>
                                setShowPassword(e.target.checked)
                            } /> Show password
                    </span>
                </div>

                <div>
                    <button className="btn btn-primary" onClick={handleLogIn}>
                        Log In
                    </button>
                </div>

            </div>
        </>
    );
}