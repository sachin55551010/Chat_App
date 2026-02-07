import { useSelector } from "react-redux";
import { useGetMessagesQuery, useGetUserQuery } from "../redux/messageApi";
import { useEffect, useRef } from "react";

export const Messages = ({ id }) => {
  const { data, isLoading } = useGetMessagesQuery(id);
  const messages = data?.messages ?? [];

  const { authUser } = useSelector((state) => state.auth);
  const { data: recevier_user } = useGetUserQuery(id);

  const recevier_profilePic = recevier_user?.user?.profilePic;

  const sender_profilePic =
    authUser?.user?.profilePic || authUser?.updatedUser?.profilePic;
  const senderId = authUser?.user?._id;
  const chatContainerRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto">
      {messages?.map((allMessage) => {
        return (
          <li key={allMessage._id} className="list-none">
            <div
              className={`chat ${
                senderId === allMessage.senderId ? "chat-end" : "chat-start"
              } mt-9`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      senderId === allMessage.senderId
                        ? sender_profilePic || "/avatar.jpg"
                        : recevier_profilePic || "/avatar.jpg"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="chat-header mt-4">
                <time className="text-xs opacity-50">
                  {new Date(allMessage.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
              <div className="chat-bubble rounded-2xl">
                {allMessage.image && (
                  <img
                    src={allMessage.image}
                    alt=""
                    className="object-cover h-45 w-auto"
                  />
                )}
                <p>{allMessage.text}</p>
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          </li>
        );
      })}
    </div>
  );
};
