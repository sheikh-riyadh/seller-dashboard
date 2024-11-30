import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: (data) => ({
        url: `categories?${data}`,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
