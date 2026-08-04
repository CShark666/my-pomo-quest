import { createContext } from "react";
import type { ClientUser } from "../types/types";

interface UserContextType {
    user: ClientUser | null,
    setUser: (user: ClientUser | null) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { }
});