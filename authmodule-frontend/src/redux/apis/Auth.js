import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: "auth/register",
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: "auth/forgot-password",
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    resetPassword: builder.mutation({
      query: ({ data, id, resetLink }) => {
        return {
          url: `auth/reset-password/${id}/${resetLink}`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    isLoggedIn: builder.query({
      query: (token) => {
        return {
          url: `auth/isLoggedIn`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => {
        const changeData = {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        }
        return {
          url: `auth/change-password`,
          method: "POST",
          body: changeData,
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useIsLoggedInQuery,
  useChangePasswordMutation,
} = authApi;
