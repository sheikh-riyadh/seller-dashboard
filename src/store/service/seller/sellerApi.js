import { baseApi } from "../../api/baseApi";

const sellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSeller: build.query({
      query: (data) => ({
        url: `get-seller/${data}`,
      }),
      providesTags: ["seller"],
    }),
    getSellerDetails: build.query({
      query: (data) => ({
        url: `seller-details/${data}`,
      }),
      providesTags: ["seller"],
    }),
    createSeller: build.mutation({
      query: (data) => ({
        url: "create-seller",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller"],
    }),
    updateSeller: build.mutation({
      query: (data) => ({
        url: "seller-update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seller"],
    }),
  }),
});

export const {
  useCreateSellerMutation,
  useGetSellerQuery,
  useGetSellerDetailsQuery,
  useUpdateSellerMutation,
  useLazyGetSellerQuery,
} = sellerApi;
