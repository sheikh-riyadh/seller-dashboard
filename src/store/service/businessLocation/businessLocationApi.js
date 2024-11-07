import { baseApi } from "../../api/baseApi";

const businessLocationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSellerLocation: build.query({
      query: (sellerId) => ({
        url: `seller-location/${sellerId}`,
      }),
      providesTags: ["seller-location"],
    }),
    createSellerLocation: build.mutation({
      query: (data) => ({
        url: `seller-create-location`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller-location"],
    }),
    updateSellerLocation: build.mutation({
      query: (data) => ({
        url: `seller-update-location`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seller-location"],
    }),
  }),
});

export const {
  useGetSellerLocationQuery,
  useCreateSellerLocationMutation,
  useUpdateSellerLocationMutation,
} = businessLocationApi;
