import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { signUpUser } from "../userApi";
import type { SignupFormErrors, SignUpFormValues } from "../types/FormTypes";
import { validateSignUpValues } from "../util/validation";

type SignUpFormProps = {
  signUpAction: () => void
}

const initialValues: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export function SignUpForm({ signUpAction }: SignUpFormProps) {
  const [values, setValues] = useState<SignUpFormValues>(initialValues);
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof SignUpFormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);


    if (touched[name as keyof SignUpFormValues]) {
      setErrors(validateSignUpValues(newValues));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateSignUpValues(values));
  };

  const handleSubmit = (e: FormEvent) => startTransition(async () => {
    e.preventDefault();

    const validationErrors = validateSignUpValues(values);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const responseErrors = await signUpUser({
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });

    setSubmitted(true);
    setValues(initialValues);
    setTouched({});

    if (Object.keys(responseErrors).length === 0) {
      signUpAction();
    }

  });

  if (submitted) {
    return <p>Registration was successful!</p>;
  }

  return (
    <>
      <div className="flex-col justify-center fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 gap-3">

        <h1 className="text-3xl font-bold">Sign Up</h1>

        <form onSubmit={handleSubmit} noValidate>

          {/*name*/}
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="input input-primary"
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isPending}
            />
            {touched.name && errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>

          {/*email*/}
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="input input-primary"
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isPending}
            />
            {touched.email && errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
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
                disabled={isPending}
              />
              {touched.password && errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
            </div>
            <div>
              <label htmlFor="confirmPassword">ConfirmPassword</label>
              <input
                className="input input-primary"
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isPending}
              />
              {touched.confirmPassword && errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword}</span>}
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
            <button className="btn btn-primary mt-2.5" type="submit" disabled={isPending}>
              {isPending ? "Registration..." : "Sign Up"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}