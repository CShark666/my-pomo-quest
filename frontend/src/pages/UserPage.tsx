import { Suspense, use, useState } from "react";
import { Navigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { UserProfile } from "../components/UserProfile"
import { LoadingSpinnerLabel } from "../components/Loading";
import { getUser } from "../userApi";
import type { ClientUser } from '../types/types';


function UserPageContext({ initialUser }: { initialUser: Promise<ClientUser | null> }) {
    const [user, setUser] = useState<ClientUser | null>(use(initialUser));

    const logOutAction = () => {
        setUser(null);
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                {user ? (
                    <UserProfile user={user} logOutAction={logOutAction}/>
                ) : (
                    <Navigate to="/authorization" />
                )}
            </div>
        </>
    );
}

export function UserPage() {
    const initialUser = getUser();

    return (
        <>
            <Sidebar />
            <Suspense fallback={<LoadingSpinnerLabel />}>
                <UserPageContext initialUser={initialUser} />
            </Suspense>
        </>
    )
}