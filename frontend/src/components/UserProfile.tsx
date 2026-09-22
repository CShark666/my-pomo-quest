import type { ClientUser } from "../types/types";
import { logOutUser } from "../api/userAPI";

type UserProfileProps = {
    user: ClientUser,
    logOutAction: () => void
}

export function UserProfile({ user, logOutAction }: UserProfileProps) {
    const handleLogUot = async () => {
        await logOutUser();
        logOutAction();
    }
    return (
        <>
            <div className="flex-col bg-base-200 border-base-300 rounded-box w-xl border p-4 gap-3">
                <div className="flex justify-end items-end">
                    <button className="btn btn-ghost">
                        Edit
                    </button>
                </div>

                <div className="flex w-full justify-between">
                    <div className="flex-1">
                        <img src="/user_pic.jpg" alt="profile-pic" className="rounded-full size-36" />
                    </div>

                    <div className="flex-2">
                        <div className="flex justify-between p-1">
                            <div>
                                <span>{user.name}</span>
                            </div>
                            <div className="grid text-right">
                                <span> Streak: {user.streak} Lvl: {user.level}</span>
                                <span className="opacity-50">Exp: {user.currentExperience} / 240</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex justify-end items-end">
                    <button className="btn btn-ghost" onClick={handleLogUot}>
                        Log out
                    </button>
                </div>
            </div>
        </>
    )
}