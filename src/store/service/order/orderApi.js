import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrder: build.query({
      query: (query) => ({
        url: `order?${query}`,
      }),
      providesTags: ["order"],
    }),
    getAnalyticeData: build.query({
      query: (query) => ({
        url: `analytice-order?${query}`,
      }),
      providesTags: ["order"],
    }),
    updateOrderStatus: build.mutation({
      query: (data) => ({
        url: `update-order-status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
  useGetAnalyticeDataQuery,
} = orderApi;
