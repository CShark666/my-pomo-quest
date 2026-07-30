import { Sidebar } from "./Sidebar";
import { LogInForm } from "../components/LogInForm";
import type { ClientUser } from "../types/types";
import { Suspense, use } from "react";
import { Navigate } from "react-router";
import { getUser } from "../userApi";
import { LoadingSpinnerLabel } from "../components/Loading";

function LogInPageContext({ initialUser }: { initialUser: Promise<ClientUser | null> }) {
    const user: ClientUser | null = use(initialUser);

    return (
        <div className="flex justify-center items-center h-screen">
            {
                user ? (<Navigate to="/user/" />) : (<LogInForm />)
            }
        </div>
    )
}

export function LogInPage() {
    const initialUser = getUser();

    return (
        <>
            <Sidebar />
            <Suspense fallback={<LoadingSpinnerLabel />}>
                <LogInPageContext initialUser={initialUser} />
            </Suspense>
        </>
    );
}