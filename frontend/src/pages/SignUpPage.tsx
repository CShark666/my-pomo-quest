import { Sidebar } from "./Sidebar";
import { RegistrationForm } from "../components/RegistrationForm";
import type { ClientUser } from "../types/types";
import { Suspense, use } from "react";
import { Navigate } from "react-router";
import { getUser } from "../userApi";
import { LoadingSpinnerLabel } from "../components/Loading";

function SingUpPageContext({ initialUser }: { initialUser: Promise<ClientUser | null> }) {
    const user: ClientUser | null = use(initialUser);

    return (
        <div className="flex justify-center items-center h-screen">
            {
                user ? (<Navigate to="/user/" />) : (<RegistrationForm />)
            }
        </div>
    )

}

export function SingUpPage() {
    const initialUser = getUser();

    return (
        <>
            <Sidebar />
            <Suspense fallback={<LoadingSpinnerLabel />}>
                <SingUpPageContext initialUser={initialUser} />
            </Suspense>
        </>
    );
}