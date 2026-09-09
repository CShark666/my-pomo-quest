import { SignUpForm } from "../components/AuthPage/SignUpForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../api/userAPI";

export function SignUpPage() {
    const initialUser = useContext(UserContext)

    const signUpAction = async () => {
        initialUser.setUser(await getUser());
    }

    return (
        <>
            <SignUpForm signUpAction={signUpAction} />
        </>
    );
}