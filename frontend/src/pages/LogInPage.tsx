import { Sidebar } from "./Sidebar";
import { LogInForm } from "../components/LogInForm";

export function LogInPage() {
    return (
        <>
            <Sidebar />
            <div className="flex justify-center items-center h-screen">
                <LogInForm />
            </div>
        </>
    );
}