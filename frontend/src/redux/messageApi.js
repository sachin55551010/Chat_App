import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSocket } from "../api/socket";

export const messageApi = createApi({
  reducerPath: "message_Api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/message`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    //* get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["User"],
    }),

    //* send message
    sendMessage: builder.mutation({
      query: ({ receiverId, ...data }) => ({
        url: `/send/${receiverId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    //* get a user info with we are chatting
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
      }),
      invalidatesTags: ["User"],
    }),

    //* get all Messages
    getMessages: builder.query({
      query: (id) => ({ url: `/chat/${id}` }),
      async onCacheEntryAdded(
        id,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();
          if (!socket) return;
          const handleNewMessage = (newMessage) => {
            if (newMessage.senderId === id || newMessage.receiverId === id) {
              updateCachedData((draft) => {
                draft.messages.push(newMessage);
              });
            }
          };

          socket.on("newMessage", handleNewMessage);

          await cacheEntryRemoved;
          socket.off("newMessage", handleNewMessage);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useSendMessageMutation,
  useGetUserQuery,
  useGetMessagesQuery,
} = messageApi;
