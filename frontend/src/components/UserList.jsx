import { CgSpinner } from "react-icons/cg";
import { useGetAllUsersQuery, useGetMessagesQuery } from "../redux/messageApi";
import { RiSearch2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { ChatContainer } from "./ChatContainer";
import { useState } from "react";

export const UserList = () => {
  const { data: messages } = useGetMessagesQuery();
  const [isChatSelected, setIsChatSelcected] = useState(null);
  const { data, isLoading } = useGetAllUsersQuery();

  const users = data?.filteredUsers ?? [];

  const handleChatClickBtn = (userId) => {
    setIsChatSelcected(userId);
  };

  return (
    <div className="">
      <div
        className={`max-h-dvh overflow-y-scroll pt-[var(--nav-h)] p-2 ${
          isChatSelected ? "hidden" : "block"
        }`}
      >
        <div className="bg-base-100 fixed h-20 top-0 left-0 right-0 p-2 mt-10 flex items-center justify-center">
          <div className="flex-1 border rounded-full flex items-center gap-2 p-2">
            <RiSearch2Line className="size-6" />
            <input
              type="text"
              className="flex-1 border-transparent outline-none"
              placeholder="Search..."
            />
          </div>
        </div>

        {users.length === 0 && <p>Add Friends</p>}
        <ul className="my-list flex flex-col gap-1 mt-20">
          {isLoading && <CgSpinner className="size-10 animate-spin" />}
          {users?.map((user) => {
            return (
              <NavLink
                to={`/chat/${user._id}`}
                onClick={() => handleChatClickBtn(user._id)}
                key={user._id}
                className="border-b-1 rounded-md border-gray-300 p-1 hover:bg-gray-700 transition duration-400 cursor-pointer hover:rounded-md"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="object-cover h-12 w-12 rounded-full"
                    src={user.profilePic || "avatar.jpg"}
                    alt=""
                  />
                  <div>
                    <h1 className="font-bold text-[.9rem]">{user.fullName}</h1>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </ul>
      </div>
      <div className={`${isChatSelected ? "block" : "hidden"}`}>
        <ChatContainer isChatSelected={isChatSelected} />
      </div>
    </div>
  );
};
