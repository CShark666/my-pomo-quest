import { Link } from "react-router";
import { Sidebar } from "./Sidebar";
import "../styles/HomePage.css";

export function HomePage() {
  return (
    <>
      <Sidebar />
      <h1>Welcome to Pomo-Quest home page!</h1>
      <div className="link-box">
        <Link to="/quest/create">
          <div className="circle">
            <p>Create new quest</p>
          </div>
        </Link>
      </div>
    </>
  );
}
