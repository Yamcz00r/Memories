"use client";

import { useAppSelector } from "@/store/hooks";

function Home() {
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);
  return <h1>Your token: {token}</h1>;
}
export default Home;
