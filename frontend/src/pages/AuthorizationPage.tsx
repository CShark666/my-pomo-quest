import { Link } from "react-router";
import { Sidebar } from "./Sidebar";

export function AuthorizationPage() {
    return <>
        <Sidebar />
        <div className="flex justify-center items-center h-screen">
            <samp>To get started, please
                <Link className="btn mr-1.5 ml-1.5" to="/user/login">Log in</Link>
                or
                <Link className="btn mr-1.5 ml-1.5" to="/user/signup">Sign up</Link>
            </samp>

        </div>
    </>
}