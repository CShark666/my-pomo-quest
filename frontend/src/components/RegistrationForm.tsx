import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerUser } from "../userApi";
import type { FormErrors, FormValues } from "../types/FormTypes";
import { validateRegistration } from "../util/validation";

type RegistrationFormProps = {
  signUpAction: () => void
}

const initialValues: FormValues = {
  login: "",
  password: ""
};

export function RegistrationForm({ signUpAction }: RegistrationFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);


    if (touched[name as keyof FormValues]) {
      setErrors(validateRegistration(newValues));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateRegistration(values));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRegistration(values);
    setErrors(validationErrors);
    setTouched({ login: true, password: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await registerUser({
        login: values.login,
        password: values.password
      });

      setSubmitted(true);
      setValues(initialValues);
      setTouched({});
    } finally {
      setSubmitting(false);
      signUpAction();
    }
  };

  if (submitted) {
    return <p>Registration was successful!</p>;
  }

  return (
    <>
      <div className="flex-col justify-center fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-3">

        <h1 className="text-3xl font-bold">SignUp</h1>

        <form onSubmit={handleSubmit} noValidate>

          {/*login*/}
          <div className="grid gap-1">
            <label htmlFor="login">Login</label>
            <input
              className="input input-primary"
              id="login"
              name="login"
              type="text"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={submitting}
            />
            {touched.login && errors.login && <span style={{ color: "red" }}>{errors.login}</span>}
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
                onBlur={handleBlur}
                disabled={submitting}
              />
              {touched.password && errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
            </div>

            <span>
              <input type="checkbox" className="checkbox"
                onChange={(e) =>
                  setShowPassword(e.target.checked)
                }
              /> Show password
            </span>

          </div>

          <div>
            <button className="btn btn-primary mt-2.5" type="submit" disabled={submitting}>
              {submitting ? "Registration..." : "Sign Up"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}