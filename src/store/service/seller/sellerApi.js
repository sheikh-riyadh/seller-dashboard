import { baseApi } from "../../api/baseApi";

const sellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSeller: build.query({
      query: (data) => ({
        url: `get-seller/${data}`,
      }),
    }),
    createSeller: build.mutation({
      query: (data) => ({
        url: "create-seller",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSellerMutation,
  useGetSellerQuery,
  useLazyGetSellerQuery,
} = sellerApi;
