import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Authorization header
      const token = getState().auth.token;
 
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
    }),
    getAdminData: builder.query({
      query: (adminId) => ({
        url: `admin/dashboard/admin/${adminId}`,
      })
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `admin/dashboard/users/${id}`,
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery ,useGetAdminDataQuery } = api;