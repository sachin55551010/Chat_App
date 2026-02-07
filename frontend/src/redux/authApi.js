import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuthUser, setAuthUser } from "./authSlice";
import toast from "react-hot-toast";
import { messageApi } from "./messageApi";
import { createSocket, disconnectSocket } from "../api/socket";

export const authApi = createApi({
  reducerPath: "auth_api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    //* check Auth user
    checkAuthUser: builder.query({
      query: () => ({
        url: "/check",
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          createSocket(data.user._id);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    //* signup user function
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthUser(data));
          toast.success(data.message);
          createSocket(data.user._id);
        } catch (error) {
          console.log(error);
          toast.error(error.error.data.message);
        }
      },
    }),

    //* login user function
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthUser(data));
          toast.success(data.message);
          dispatch(disconnectSocket());
        } catch (error) {
          console.log(error);
          toast.error(error.error.data.message);
        }
      },
    }),

    //* logout function
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(clearAuthUser());
          toast.success(data.message);
          dispatch(messageApi.util.resetApiState());
          disconnectSocket();
        } catch (error) {
          console.log(error);
          toast.error(error.error.data.message);
        }
      },
    }),

    // update profile picture
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthUser(data));
          toast.success(data.message);
        } catch (error) {
          console.log(error);
          toast.error(error.error.data.message);
        }
      },
    }),
  }),
});

export const {
  useCheckAuthUserQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authApi;
