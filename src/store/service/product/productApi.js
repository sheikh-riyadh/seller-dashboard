import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (sellerId) => ({
        url: `seller-products/${sellerId}`,
      }),
      providesTags: ["seller-product"],
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: "seller-product-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller-product"],
    }),
    updateProduct: build.mutation({
      query: (data) => ({
        url: "seller-product-update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seller-product"],
    }),
    deleteProduct: build.mutation({
      query: (data) => ({
        url: `seller-delete-product?${new URLSearchParams(data)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["seller-product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
