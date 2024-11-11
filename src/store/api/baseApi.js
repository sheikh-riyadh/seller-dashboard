import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  // credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "seller",
    "seller-banner",
    "seller-brands",
    "seller-location",
    "seller-policy",
    "seller-product",
    "seller-annoucement"
  ],
  endpoints: () => ({}),
});
