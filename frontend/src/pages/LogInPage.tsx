import { Sidebar } from "./Sidebar";
import { LogInForm } from "../components/LogInForm";
import type { ClientUser } from "../types/types";
import { Suspense, useContext } from "react";
import { Navigate } from "react-router";
import { LoadingSpinnerLabel } from "../components/Loading";
import { UserContext } from "../contexts/UserContext";
import { getUser } from "../userApi";

type LogInPageProps = {
    user: ClientUser | null,
    setUser: (user: ClientUser | null) => void
}

function LogInPageContext({ user, setUser }: LogInPageProps) {

    const logInAction = async () => {
        setUser(await getUser())
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {
                user
                    ? (<Navigate to="/user/" />)
                    : (<LogInForm logInAction={logInAction} />)
            }
        </div>
    )
}

export function LogInPage() {
    const initialUser = useContext(UserContext);

    return (
        <>
            <Sidebar />
            <Suspense fallback={<LoadingSpinnerLabel />}>
                <LogInPageContext user={initialUser.user} setUser={initialUser.setUser} />
            </Suspense>
        </>
    );
}