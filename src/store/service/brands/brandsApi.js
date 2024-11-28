import { baseApi } from "../../api/baseApi";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSellerBrands: build.query({
      query: (data) => ({
        url: `seller-brands?${data}`,
      }),
      providesTags: ["seller-brands"],
    }),

    createSellerBrands: build.mutation({
      query: (data) => ({
        url: "seller-create-brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller-brands"],
    }),
    updateSellerBrands: build.mutation({
      query: (data) => ({
        url: "seller-update-brands",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seller-brands"],
    }),
  }),
});

export const {
  useCreateSellerBrandsMutation,
  useGetSellerBrandsQuery,
  useUpdateSellerBrandsMutation,
} = brandsApi;
