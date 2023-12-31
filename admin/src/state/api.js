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
  tagTypes: ["Admin", "Products", "User", "Users", "Orders"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "admin/dashboard/users",
      }),
      providesTags: ["Users"],
    }),
    getAdminData: builder.query({
      query: (adminId) => ({
        url: `admin/dashboard/admin/${adminId}`,
      }),
      providesTags: ["Admin"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `admin/dashboard/users/${id}`,
      }),
      providesTags: ["User"],
    }),
    getProducts: builder.query({
      query: () => ({
        url: "admin/dashboard/products",
      }),
      providesTags: ["Products"],
    }),
    getOrders: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "admin/dashboard/orders",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Orders"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "category/",
      }),
    }),
    getTags: builder.query({
      query: () => ({
        url: "tags/",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetAdminDataQuery,
  useGetProductsQuery,
  useGetOrdersQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
} = api;
