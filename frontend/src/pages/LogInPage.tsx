import { LogInForm } from "../components/LogInForm";
import { Suspense, useContext } from "react";
import { LoadingSpinnerLabel } from "../components/Loading";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../userApi";

export function LogInPage() {
    const initialUser = useContext(UserContext);

    const logInAction = async () => {
        initialUser.setUser(await getUser())
    }

    return (
        <>
            <Suspense fallback={<LoadingSpinnerLabel />}>
                <LogInForm logInAction={logInAction} />
            </Suspense>
        </>
    );
}