import { Link } from "react-router";
import { Sidebar } from "./Sidebar";

export function HomePage() {
  return (
    <>
      <Sidebar />
      <div className="flex justify-center text-4xl">
        <h1>Welcome to Pomo-Quest home page!</h1>
      </div>
      <div className="link-box flex justify-center items-center m-4">
        <Link to="/quest/">
          <div className="flex justify-center items-center w-40 h-40 rounded-full bg-primary text-white font-bold">
            <h2>Pomo-quest</h2>
          </div>
        </Link>
      </div>
    </>
  );
}
