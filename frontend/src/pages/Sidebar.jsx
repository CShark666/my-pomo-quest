import { Link } from "react-router";
import { useState } from "react";
import "../styles/Sidebar.css";

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const sidebarToggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const toggleBtn = () => {
    return (
      <button className="sidebar-btn" onClick={sidebarToggle}>
        {open ? "Hide" : "Open"}
      </button>
    );
  };
  return (
    <div className="sidebar">
      {toggleBtn()}
      {open && (
        <div className={`sidenav ${open}`}>
          {toggleBtn()}
          <div>
            <Link to="user/:id">Profile</Link>
          </div>
          <Link to="/">Home</Link>
          <Link to="/quest/:id">Current Quest</Link>
          <Link to="/quest/create">New Quest</Link>
          <Link to="/user/:id/history">History</Link>
          <Link to="/user/:id/stats">Stats</Link>
          <Link to="/user/:id/habits">Habits</Link>
        </div>
      )}
    </div>
  );
}
