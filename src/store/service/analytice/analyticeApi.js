import { baseApi } from "../../api/baseApi";

const analyticeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnalyticeData: build.query({
      query: (query) => ({
        url: `order-analytices?${query}`,
      }),
    }),
  }),
});

export const { useGetAnalyticeDataQuery } = analyticeApi;
