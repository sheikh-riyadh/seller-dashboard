import { baseApi } from "../../api/baseApi";


const adminMessageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminMessage: build.query({
      query: () => ({
        url: "admin-message",
      }),
    }),
  }),
});

export const { useGetAdminMessageQuery } = adminMessageApi;
