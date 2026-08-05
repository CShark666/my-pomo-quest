import { Navigate, Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function HomePage() {
  const userContext = useContext(UserContext);
  const user = userContext.user!;

  return (
    <>
      <Sidebar />
      <div className="flex flex-col gap-2.5 justify-center items-center h-screen">
        {user
          ? <Outlet />
          : <Navigate to="/authorization" />
        }
      </div>
    </>
  );
}
