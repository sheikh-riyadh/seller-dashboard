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
        url: `seller-details?${data}`,
      }),
      providesTags: ["seller"],
    }),
    logout: build.query({
      query: (data) => ({
        url: `logout?${data}`,
      }),
      invalidatesTags: ["seller"],
    }),
    createSeller: build.mutation({
      query: (data) => ({
        url: "create-seller",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller"],
    }),
    createJwt: build.mutation({
      query: (data) => ({
        url: "jwt",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
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
  useGetSellerDetailsQuery,
  useLazyLogoutQuery,
  useCreateSellerMutation,
  useCreateJwtMutation,
  useGetSellerQuery,
  useUpdateSellerMutation,
  useLazyGetSellerQuery,
} = sellerApi;
