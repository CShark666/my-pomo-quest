import { RegistrationForm } from "../components/RegistrationForm";
import { Suspense, useContext } from "react";
import { LoadingSpinnerLabel } from "../components/Loading";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../userApi";

export function SignUpPage() {
    const initialUser = useContext(UserContext)

    const signUpAction = async () => {
        initialUser.setUser(await getUser());
    }

    return (
        <>
            <Suspense fallback={<LoadingSpinnerLabel />}>
                <RegistrationForm signUpAction={signUpAction} />
            </Suspense>
        </>
    );
}