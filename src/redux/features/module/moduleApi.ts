import { baseApi } from "../../api/baseApi";

const moduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllModules: builder.query({
      query: () => ({
        url: "/module",
        method: "GET",
      }),
    }),
    getModulesByTopicId: builder.query({
      query: (topicId: string) => ({
        url: `/module/${topicId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllModulesQuery, useGetModulesByTopicIdQuery } = moduleApi;
