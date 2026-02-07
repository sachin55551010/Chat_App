import { useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/authApi";
import { NavLink } from "react-router-dom";
export const NavBar = () => {
  const { authUser } = useSelector((state) => state.auth);

  const [logout] = useLogoutMutation();
  const user_name = authUser?.updatedUser?.fullName || authUser?.user?.fullName;

  return (
    <div className="fixed z-[100] bg-base-100 w-screen flex justify-between items-center px-2 h-[var(--nav-h)] shadow-[0_2px_5px_rgb(0,0,0,1)]">
      <div className="flex items-center gap-2">
        <img className="h-7 w-7" src="/chat logo.png" alt="" />
        <h1 className="font-bold text-md">Lets Chat</h1>
      </div>

      {authUser && (
        <div className="flex gap-2">
          <NavLink
            to="/profile"
            className="text-[.9rem] font-bold border-1 px-1 py-1 rounded-lg cursor-pointer"
          >
            {user_name || ""}
          </NavLink>
          <button
            onClick={() => logout()}
            className="text-[.9rem] border-1 px-1 py-1  rounded-lg font-bold cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
