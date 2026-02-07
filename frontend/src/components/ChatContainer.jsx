import { ChatHeader } from "./ChatHeader";
import { Messages } from "./Messages";
import { MessageInput } from "./MessageInput";
import { ProfilePicPreview } from "./ProfilePicPreview";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ChatContainer = () => {
  const { isPreviewImg } = useSelector((state) => state.auth);
  const { id } = useParams();

  // if (true) return <ChatSkelton />;
  return (
    <>
      <div
        className={`min-h-dvh pt-[var(--nav-h)] ${
          isPreviewImg ? "blur-sm opacity-15" : ""
        } transition-all duration-200`}
      >
        <ChatHeader />
        <Messages id={id} />
        <MessageInput />
      </div>
      {isPreviewImg && <ProfilePicPreview id={id} />}
    </>
  );
};
