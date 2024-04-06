import { baseApi } from "../../api/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (blog) => ({
        url: "blog",
        method: "POST",
        body: blog,
      }),
    }),
    getBlogByModuleId: builder.query({
      query: (moduleId) => ({
        url: `blog/${moduleId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddBlogMutation, useGetBlogByModuleIdQuery } = quizApi;
