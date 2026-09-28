import { LogInForm } from "../components/AuthPage/LogInForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../api/userAPI";

export function LogInPage() {
    const initialUser = useContext(UserContext);

    const logInAction = async () => {
        initialUser.setUser(await getUser())
    }

    return (
        <>
            <LogInForm logInAction={logInAction} />
        </>
    );
}