import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { logOutUser } from "../userApi";


export function Sidebar() {
  const userContext = useContext(UserContext);
  const user = userContext.user;

  const logOutAction = async () => {
    await logOutUser();
    userContext.setUser(null);
  }

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
          <span>{user?.login} lvl: {user?.level}</span>
          {/* Sidebar content here */}
          <li><Link to="user">Profile</Link></li>
          <li><Link to="quest">Pomo-Quest</Link></li>
          <li><button className="btn btn-ghost" onClick={logOutAction}>Log out</button></li>
        </ul>
      </div>
    </div>
  )
}
