import { Sidebar } from "./Sidebar";
import { RegistrationForm } from "../components/RegistrationForm";

export function SingUpPage() {
    return (
        <>
            <Sidebar />
            <div className="flex justify-center items-center h-screen">
                <div>
                    <RegistrationForm />
                </div>
            </div>
        </>
    );
}