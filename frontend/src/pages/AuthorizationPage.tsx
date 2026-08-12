import { Link, Navigate, Outlet } from "react-router";
import { Suspense, useContext } from "react";
import { LoadingSpinnerLabel } from "../components/Loading";
import { UserContext } from "../contexts/UserContext";

function AuthorizationPageContext() {
    return (
        <>
            <div className="flex flex-col gap-2.5 justify-center items-center h-screen">
                <samp>To get started, please
                    <Link className="btn mr-1.5 ml-1.5" to="login">Log in</Link>
                    or
                    <Link className="btn mr-1.5 ml-1.5" to="signup">Sign up</Link>
                </samp>
                <Suspense fallback={<LoadingSpinnerLabel />}>
                    <Outlet />
                </Suspense>
            </div>
        </>
    )
}

export function AuthorizationPage() {
    const userContext = useContext(UserContext);

    return <>
        {userContext.user
            ? <Navigate to="/" />
            : <AuthorizationPageContext />
        }
    </>
}