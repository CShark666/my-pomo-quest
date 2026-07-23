import { Sidebar } from "./Sidebar";
import { UserProfile } from "../components/UserProfile"

export function UserPage() {
    return (
        <>
            <Sidebar />
            <div className="flex justify-center items-center h-screen">
                <UserProfile />
            </div>
        </>
    )
}