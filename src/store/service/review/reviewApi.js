import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReview: build.query({
      query: (query) => ({
        url: `review?${query}`,
      }),
      providesTags: ["review"],
    }),
  }),
});

export const { useGetReviewQuery } = reviewApi;
