import { baseApi } from "../../api/baseApi";

const annoucementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnnoucement: build.query({
      query: (data) => ({
        url: `seller-annoucement?${data}`,
      }),
      providesTags: ["seller-annoucement"],
    }),
    createAnnoucement: build.mutation({
      query: (data) => ({
        url: "seller-annoucement-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller-annoucement"],
    }),
    updateAnnoucement: build.mutation({
      query: (data) => ({
        url: "seller-annoucement-update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seller-annoucement"],
    }),
    deleteAnnoucement: build.mutation({
      query: (data) => ({
        url: `seller-delete-annoucement?${data}`,
        method: "DELETE",
      }),
      invalidatesTags: ["seller-annoucement"],
    }),
  }),
});

export const {
  useCreateAnnoucementMutation,
  useGetAnnoucementQuery,
  useUpdateAnnoucementMutation,
  useDeleteAnnoucementMutation,
} = annoucementApi;
