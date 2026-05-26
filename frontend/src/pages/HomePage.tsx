import { Link } from "react-router";
import { Sidebar } from "./Sidebar";
import "../styles/HomePage.css";

export function HomePage() {
  return (
    <>
      <Sidebar />
      <h1>Welcome to Pomo-Quest home page!</h1>
      <div className="link-box">
        <Link to="/quest/">
          <div className="circle">
            <h2>Pomo-quest</h2>
          </div>
        </Link>
      </div>
    </>
  );
}
