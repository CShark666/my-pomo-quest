import { Link } from "react-router";

export function Sidebar() {

  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-1" className="btn drawer-button">Sidebar</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-60 p-4">
          {/* Sidebar content here */}
          <li><Link to="user/:id">Profile</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quest/">Pomo-Quest</Link></li>
        </ul>
      </div>
    </div>
  )
}
