import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { logOutUser } from "../api/userAPI";
import icon from '../assets/sidebar-icon.png'


export function Sidebar() {
  const userContext = useContext(UserContext);
  const user = userContext.user!;

  const logOutAction = async () => {
    await logOutUser();
    userContext.setUser(null);
  }

  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">

        {/* Page content here */}

        <div className="fixed top-4 left-4 z-10">
          <label htmlFor="my-drawer-1">
            <img
              src={icon}
              alt="sidebar"
              className="w-12 cursor-pointer"
            />
          </label>
        </div>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>

        <aside className="bg-base-200 min-h-full w-60 flex flex-col">

          {/* User info */}
          {user && (
            <div className="p-4">
              <Link to="user">Profile
                <div className="flex justify-between rounded-2xl outline-1 p-2">
                  <div className="grid">
                    <span>{user.name}</span>
                    <span>Lvl: {user.level}</span>
                    <span>
                      Exp: {user.currentExperience}/240
                    </span>
                  </div>

                  {user.streak > 0 && (
                    <span>
                      Streak: {user.streak}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          )}

          <ul className="menu p-4 h-full">

            {/* Sidebar content here */}
            <li>Pages:</li>
            <li><Link to="/">Home page</Link></li>
            <li><Link to="quest">Pomo-Quest</Link></li>
            <li><Link to="questsHistory">Quests history</Link></li>
          </ul>

          {/* Logout */}
          <div className="mt-auto p-4">
            <button className="btn btn-ghost"
              onClick={logOutAction}
            >
              Log out
            </button>
          </div>

        </aside>
      </div>
    </div>
  )
}
