import { useContext } from "react";
import { UserProfile } from "../components/UserProfile"
import { UserContext } from "../contexts/UserContext";

export function UserPage() {
    const userContext = useContext(UserContext);

    const logOutAction = () => {
        userContext.setUser(null);
    }

    return (
        <>
            <UserProfile user={userContext.user!} logOutAction={logOutAction} />
        </>
    )
}