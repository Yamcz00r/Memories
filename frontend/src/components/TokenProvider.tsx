"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { insertToken } from "@/store/slices/AuthSlice";
import { useRouter } from "next/navigation";

export default function TokenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (!token) {
      if (!existingToken) {
        router.push("/");
      }
      dispatch(insertToken(existingToken!));
    }
    if (token) {
      router.push("/home");
    }
  }, [token]);

  return <>{children}</>;
}
