import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const postSlice = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/content/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<any, void>({
      query: () => "/todos",
    }),
  }),
});

export const { useGetPostsQuery } = postSlice;
