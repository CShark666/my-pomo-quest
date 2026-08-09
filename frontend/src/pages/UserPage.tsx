import { useContext } from "react";
import { Navigate } from "react-router";
import { UserProfile } from "../components/UserProfile"
import type { ClientUser } from '../types/types';
import { UserContext } from "../contexts/UserContext";

type UserPageProps = {
    user: ClientUser | null,
    setUser: (user: ClientUser | null) => void
}

function UserPageContext({ user, setUser }: UserPageProps) {
    const logOutAction = () => {
        setUser(null);
    }

    return (
        <>
            <>
                {user
                    ? <UserProfile user={user} logOutAction={logOutAction} />
                    : <Navigate to="/authorization" />
                }
            </>
        </>
    );
}

export function UserPage() {
    const initialUser = useContext(UserContext);

    return (
        <>
            <UserPageContext user={initialUser.user} setUser={initialUser.setUser} />
        </>
    )
}