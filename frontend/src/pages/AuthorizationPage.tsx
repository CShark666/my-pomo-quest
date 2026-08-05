import { Link, Navigate, Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Suspense, useContext } from "react";
import { LoadingSpinnerLabel } from "../components/Loading";
import type { ClientUser } from "../types/types";
import { UserContext } from "../contexts/UserContext";

function AuthorizationPageContext({ user }: { user: ClientUser | null }) {
    return (
        <>
            <div className="flex flex-col gap-2.5 justify-center items-center h-screen">
                {user ? (
                    <Navigate to="/user/" />
                ) : (
                    <>
                        <samp>To get started, please
                            <Link className="btn mr-1.5 ml-1.5" to="login">Log in</Link>
                            or
                            <Link className="btn mr-1.5 ml-1.5" to="signup">Sign up</Link>
                        </samp>
                        <Outlet />
                    </>
                )}
            </div>
        </>
    )
}

export function AuthorizationPage() {
    const initialUser = useContext(UserContext);

    return <>
        <Sidebar />
        <Suspense fallback={<LoadingSpinnerLabel />}>
            <AuthorizationPageContext user={initialUser.user} />
        </Suspense>
    </>
}