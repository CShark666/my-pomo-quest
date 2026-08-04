import { useState, useTransition } from "react";
import { registerUser } from "../userApi";
import { LoadingSpinnerLabel } from "./Loading";

type RegistrationFormProps = {
  signUpAction: () => void
}

export function RegistrationForm({ signUpAction }: RegistrationFormProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition();

  const handleSignUp = () => startTransition(async () => {
    await registerUser({
      login: login,
      password: password
    });

    signUpAction();
  })

  return (
    <>
      <div className="flex-col justify-center fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-3">

        <h1>SignUp</h1>

        {/*login*/}
        <div className="grid gap-1">
          <input
            className="input input-primary"
            type="text"
            placeholder="Name"
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            required
            disabled={isPending}
          />
        </div>

        {/*password*/}
        <div className="grid gap-1">
          <input
            className="input input-primary"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            disabled={isPending}
          />
          <span>
            <input type="checkbox" className="checkbox"
              onChange={(e) =>
                setShowPassword(e.target.checked)
              }
              disabled={isPending}
            /> Show password
          </span>
        </div>

        <div>
          <button className="btn btn-primary" onClick={handleSignUp} disabled={isPending}>
            Sign Up
          </button>
        </div>

        <div>
          {isPending && <LoadingSpinnerLabel />}
        </div>
      </div>
    </>
  );
}