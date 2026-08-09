import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { ClientUser } from "../types/types";
import { getUser } from "../userApi";
import { LoadingSpinnerLabel } from "../components/Loading";
import { QuestContextProvider } from "./QuestContextProvider";

export function ContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ClientUser | null>(null);
    const [isUserReady, setIsUserReady] = useState<boolean>(false);

    useEffect(() => {
        getUser()
            .then(setUser)
            .then(() => setIsUserReady(true))
    }, [])

    return (
        !isUserReady
            ? <LoadingSpinnerLabel />
            : <UserContext.Provider value={{ user, setUser }}>
                <QuestContextProvider>
                    {children}
                </QuestContextProvider>
            </UserContext.Provider>
    )
}