import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setIsPreview } from "../redux/authSlice";
import { useGetUserQuery } from "../redux/messageApi";
export const ProfilePicPreview = ({ id }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { data } = useGetUserQuery(id);

  return (
    <div className="absolute border border-base-200 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-300 transition-all duration-300">
      <div className="w-70 h-70 relative">
        <img
          src={
            id
              ? data?.user?.profilePic || "avatar.jpg"
              : authUser?.user?.profilePic ||
                authUser?.updatedUser?.profilePic ||
                "avatar.jpg"
          }
          alt=""
          className="object-fit h-[100%] w-full rounded-lg"
        />
        <div
          onClick={() => dispatch(setIsPreview(false))}
          className="absolute bg-base-200 top-[-25%] right-[-1%] hover:bg-base-300 py-2 px-4 rounded-md transition-all duration-300"
        >
          <ImCross className="" />
        </div>
      </div>
    </div>
  );
};
