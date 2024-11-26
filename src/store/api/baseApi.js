import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_api_url}`,
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
    "seller-annoucement",
    "product-questions",
    "order",
    "review",
  ],
  endpoints: () => ({}),
});
