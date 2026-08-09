import { LogInForm } from "../components/LogInForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../userApi";

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