import { baseApi } from "../../api/baseApi";

const returnPolicyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReturnPolicy: build.query({
      query: (sellerId) => ({
        url: `seller-return-policy/${sellerId}`,
      }),
      providesTags: ["seller-policy"],
    }),
    createReturnPolicy: build.mutation({
      query: (data) => ({
        url: `seller-return-policy-create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller-policy"],
    }),

    updateReturnPolicy: build.mutation({
      query: (data) => ({
        url: `seller-return-policy-update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seller-policy"],
    }),
  }),
});

export const {
  useGetReturnPolicyQuery,
  useUpdateReturnPolicyMutation,
  useCreateReturnPolicyMutation,
} = returnPolicyApi;
