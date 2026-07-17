import { Sidebar } from "./Sidebar";

export function AuthorizationPage() {
    return <>
        <Sidebar />
        <div className="flex justify-center items-center">
            <samp>To get started, please 
                <button className="btn mr-1.5 ml-1.5">Log in</button>
                or
                <button className="btn mr-1.5 ml-1.5">Sign up</button>
            </samp>

        </div>
    </>
}