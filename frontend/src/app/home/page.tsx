"use client";

import { useAppSelector } from "@/store/hooks";
import { useGetPostsQuery } from "@/store/apiSlices/postSlice";
function Home() {
  const token = useAppSelector((state) => state.auth.token);
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetPostsQuery();
  console.log(token);
  return <h1>Your token: {token}</h1>;
}
export default Home;
