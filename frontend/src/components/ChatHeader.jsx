import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetUserQuery } from "../redux/messageApi";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsPreview } from "../redux/authSlice";
export const ChatHeader = () => {
  const { id } = useParams();
  const { data } = useGetUserQuery(id, { skip: !id });
  const user_name = data?.user?.fullName;
  const user_profilePic = data?.user?.profilePic ?? "avatar.jpg";
  const dispatch = useDispatch();

  return (
    <div className="fixed z-[90] w-full bg-base-100">
      <div className="flex items-center justify-between py-1 px-2">
        <div className="flex items-center gap-2">
          <img
            onClick={() => dispatch(setIsPreview(true))}
            src={user_profilePic || "/avatar.jpg"}
            alt=""
            className="object-cover h-9 w-9 rounded-full"
          />
          <div>
            <h1 className="font-bold text-sm">{user_name}</h1>
            <span className="text-sm"></span>
          </div>
        </div>

        <NavLink to="/">
          <IoMdArrowRoundBack className="size-7" />
        </NavLink>
      </div>
    </div>
  );
};
