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
        <div className="sidenav">
          {toggleBtn()}
          <div>
            <a href="">Profile</a>
          </div>
          <Link to="quest/create">PomoQuest</Link>
          <Link to="/">History</Link>
          <Link to="/">Stats</Link>
          <Link to="/">Habits</Link>
        </div>
      )}
    </div>
  );
}
