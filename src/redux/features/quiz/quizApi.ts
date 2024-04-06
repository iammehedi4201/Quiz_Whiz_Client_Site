import { baseApi } from "../../api/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuiz: builder.mutation({
      query: (quiz) => ({
        url: "quiz",
        method: "POST",
        body: quiz,
      }),
    }),
    getQuizByModuleId: builder.query({
      query: (moduleId) => ({
        url: `quiz/${moduleId}`,
        method: "GET",
      }),
    }),
    checkQuizAnswer: builder.mutation({
      query: (quiz) => {
        console.log("quiz", quiz);
        return {
          url: `quiz/${quiz?.moduleId}`,
          method: "PATCH",
          body: quiz?.submitedAnswer,
        };
      },
    }),
  }),
});

export const {
  useAddQuizMutation,
  useGetQuizByModuleIdQuery,
  useCheckQuizAnswerMutation,
} = quizApi;
