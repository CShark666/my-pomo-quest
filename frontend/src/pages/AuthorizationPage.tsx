import { Link, Navigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { getUser } from "../userApi";
import { Suspense, use } from "react";
import { LoadingSpinnerLabel } from "../components/Loading";
import type { ClientUser } from "../types/types";

function AuthorizationPageContext({ initialUser }: { initialUser: Promise<ClientUser | null> }) {
    const user: ClientUser | null = use(initialUser);

    return (
        <div className="flex justify-center items-center h-screen">
            {user ? (
                <Navigate to="/user/" />
            ) : (
                <>
                    <samp>To get started, please
                        <Link className="btn mr-1.5 ml-1.5" to="/authorization/login">Log in</Link>
                        or
                        <Link className="btn mr-1.5 ml-1.5" to="/authorization/signup">Sign up</Link>
                    </samp>
                </>
            )}
        </div>
    )
}

export function AuthorizationPage() {
    const initialUser = getUser();

    return <>
        <Sidebar />
        <Suspense fallback={<LoadingSpinnerLabel />}>
            <AuthorizationPageContext initialUser={initialUser} />
        </Suspense>
    </>
}