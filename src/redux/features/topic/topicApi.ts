import { baseApi } from "../../api/baseApi";

const topicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => ({
        url: "/topic",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTopicsQuery } = topicApi;
