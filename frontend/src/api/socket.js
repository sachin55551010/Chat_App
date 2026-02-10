import { io } from "socket.io-client";
let socket = null;
export const createSocket = (userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BASE_BACKEND_URL, {
      query: { userId },
      withCredentials: true,
    });
  }

  return socket;
};
export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
