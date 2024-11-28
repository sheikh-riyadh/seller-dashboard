import { baseApi } from "../../api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBanner: build.query({
      query: (data) => ({
        url: `seller-banner?${data}`,
      }),
      providesTags: ["seller-banner"],
    }),

    getDefaultBanner: build.query({
      query: (sellerId) => ({
        url: `seller-default-banner?${sellerId}`,
      }),
      providesTags: ["seller-banner"],
    }),

    createBanner: build.mutation({
      query: (data) => ({
        url: `seller-create-banner`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller-banner"],
    }),

    updateBanner: build.mutation({
      query: (data) => ({
        url: "seller-update-banner",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seller-banner"],
    }),
  }),
});

export const {
  useGetBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useGetDefaultBannerQuery,
} = bannerApi;
