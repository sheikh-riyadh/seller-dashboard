import { baseApi } from "../../api/baseApi";

const sellerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSeller: build.mutation({
      query: (data) => ({
        url: "create-seller",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateSellerMutation } = sellerApi;
