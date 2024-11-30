import { baseApi } from "../../api/baseApi";


const adminMessageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminMessage: build.query({
      query: (data) => ({
        url: `admin-message?${data}`,
      }),
    }),
  }),
});

export const { useGetAdminMessageQuery } = adminMessageApi;
