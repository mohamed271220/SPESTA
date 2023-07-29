import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spestaApi = createApi({
  reducerPath: "spestaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/admin/dashboard/products",
      }),
    }),
    getUseeData: builder.query({}),
    getCategories: builder.query({}),
    getCategoryById: builder.query({}),
    getTags: builder.query({}),
    getTagById: builder.query({}),
    getProductById: builder.query({}),
    addReview: builder.mutation({
      query: (product) => ({}),
    }),
    addToCart: builder.mutation({
      query: (product) => ({}),
    }),
    getOrderStatus: builder.query({
      query: (id) => ({}),
    }),
  }),
});

export const { useGetProductsQuery } = spestaApi;
