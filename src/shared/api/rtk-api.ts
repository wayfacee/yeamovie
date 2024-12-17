import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      headers.set("Authorization", import.meta.env.VITE_API_KEY);
      return headers;
    },
  }),
  endpoints: (/* builder */) => ({}),
});