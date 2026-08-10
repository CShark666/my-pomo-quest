import { SignUpForm } from "../components/RegistrationForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../userApi";

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