import { IoImageOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useSendMessageMutation } from "../redux/messageApi";
import { Socket } from "socket.io-client";
export const MessageInput = () => {
  const [sendMessage] = useSendMessageMutation();
  const [previewImg, setPreviewImg] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const { id: receiverId } = useParams();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessageFunction = () => {
    if (!inputMessage.trim() && !previewImg) return;

    sendMessage({ receiverId, text: inputMessage, image: previewImg });
    setInputMessage("");
    setPreviewImg("");
  };
  return (
    <div className=" sticky top-full mb-3 p-2">
      {previewImg && (
        <div className="mb-2 relative w-fit">
          <img src={previewImg} className="h-15 w-15 object-cover" alt="" />
          <div
            onClick={() => setPreviewImg(null)}
            className="bg-black p-1 rounded-full h-5 w-5 absolute top-[-10%] right-[-10%] flex justify-center items-center cursor-pointer"
          >
            <span className="">x</span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          value={inputMessage}
          onChange={handleMessageChange}
          type="text"
          placeholder="Type a message..."
          className="border w-full pl-2 rounded-lg h-10"
        />
        <label htmlFor="input-img">
          <input
            onChange={handleImgChange}
            id="input-img"
            type="file"
            className="hidden"
            accept="image/*"
          />
          <IoImageOutline
            className={`size-6 cursor-pointer ${
              previewImg ? "text-green-500" : ""
            }`}
          />
        </label>

        <IoIosSend
          onClick={sendMessageFunction}
          className={`size-6 cursor-pointer ${
            !inputMessage && !previewImg && "text-gray-100/30"
          }`}
        />
      </div>
    </div>
  );
};
