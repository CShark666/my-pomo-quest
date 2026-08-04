import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { ClientUser } from "../types/types";
import { getUser } from "../userApi";

export function ContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<ClientUser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser();
            setUser(userData)
        }
        fetchData();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}