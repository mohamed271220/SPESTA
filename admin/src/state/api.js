import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "admin/dashboard/users",
       
      }),
      providesTags: ["Admin"],
      invalidatesTags: ["Admin"],
    }),
    getUser: builder.query({
      query: (id, token) => ({
        url: `admin/dashboard/users/${id}`,
       
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = api;
