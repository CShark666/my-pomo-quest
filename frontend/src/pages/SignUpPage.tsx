import { Sidebar } from "./Sidebar";
import { RegistrationForm } from "../components/RegistrationForm";
import type { ClientUser } from "../types/types";
import { Suspense, useContext } from "react";
import { Navigate } from "react-router";
import { LoadingSpinnerLabel } from "../components/Loading";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../userApi";

type SignUpPageProps = {
    user: ClientUser | null,
    setUser: (user: ClientUser | null) => void
}

function SingUpPageContext({ user, setUser }: SignUpPageProps) {

    const signUpAction = async () => {
        setUser(await getUser());
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {
                user
                    ? (<Navigate to="/user/" />)
                    : (<RegistrationForm signUpAction={signUpAction} />)
            }
        </div>
    )

}

export function SingUpPage() {
    const initialUser = useContext(UserContext)

    return (
        <>
            <Sidebar />
            <Suspense fallback={<LoadingSpinnerLabel />}>
                <SingUpPageContext user={initialUser.user} setUser={initialUser.setUser} />
            </Suspense>
        </>
    );
}