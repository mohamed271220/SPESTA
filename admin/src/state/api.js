import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "admin/dashboard/users",
      providesTags: ["Admin"],
    }),
    getUser: builder.query({
      query: (id) => `admin/dashboard/users/${id}`,
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = api;
