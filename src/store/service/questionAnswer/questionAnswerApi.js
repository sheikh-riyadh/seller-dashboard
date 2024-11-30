import { baseApi } from "../../api/baseApi";

const questionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductQuestions: build.query({
      query: (data) => ({
        url: `product-questions?${data}`,
      }),
      providesTags: ["product-questions"],
    }),
    productAnswer: build.mutation({
      query: (data) => ({
        url: `product-answer`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product-questions"],
    }),
    deleteProductQuestion: build.mutation({
      query: (data) => ({
        url: `product-question-delete?${data}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product-questions"],
    }),
  }),
});

export const {
  useGetProductQuestionsQuery,
  useProductAnswerMutation,
  useDeleteProductQuestionMutation,
} = questionsApi;
