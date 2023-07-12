import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: ProcessingInstruction.env.REACT_APP_API_URL,
  }),
  
});
