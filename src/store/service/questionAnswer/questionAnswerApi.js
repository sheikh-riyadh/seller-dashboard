import { baseApi } from "../../api/baseApi";

const questionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductQuestions: build.query({
      query: (sellerId) => ({
        url: `product-questions/${sellerId}`,
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
      query: (id) => ({
        url: `product-question-delete/${id}`,
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
