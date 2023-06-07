"use client";

import Input from "@/components/Input";
import Form from "@/components/Form";
import { FormEvent, useState } from "react";
import { ErrorState } from "@/components/Input";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { insertToken } from "@/store/slices/AuthSlice";
import { useRouter } from "next/navigation";
import type { TokenResponse } from "@/types/auth";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseError, setResponseError] = useState<ErrorState>({
    isError: false,
    message: "",
  });
  const [emailError, setEmailError] = useState<ErrorState>({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState<ErrorState>({
    isError: false,
    message: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (passwordError.isError || emailError.isError) {
      throw new Error("Email or password is wrong!");
    }

    try {
      const tokenRequest = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!tokenRequest.ok) {
        const error = await tokenRequest.json();
        setResponseError({
          isError: true,
          message: error.message,
        });
        return;
      }
      const { token }: TokenResponse = await tokenRequest.json();

      localStorage.setItem("token", token);

      dispatch(insertToken(token));

      router.push("/home");
    } catch (error) {
      throw error;
    }
  }

  function emailValidation(value: string) {
    const schema = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = schema.test(value);

    return isEmail;
  }

  function passwordValidation(value: string) {
    const schema = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const isValidPassword = schema.test(value);

    return isValidPassword;
  }
  if (responseError.isError) {
    alert(responseError.message);
  }
  return (
    <>
      <header className="p-7 mb-32">
        <div className="font-bold text-3xl md:text-4xl xl:text-3xl">
          Memories
        </div>
      </header>
      <section className="sm:w-1/2 md:w-3/5 xl:w-1/3 mx-auto">
        <div className="font-semibold text-2xl text-center mb-5 md:text-3xl xl:text-2xl">
          Log In
        </div>
        <Form type="login" className="p-5 flex flex-col" onSubmit={onSubmit}>
          <Input
            setValue={setEmail}
            type="email"
            label="Email"
            validation={emailValidation}
            setError={setEmailError}
            error={emailError}
          />
          <Input
            setValue={setPassword}
            type="password"
            label="Password"
            validation={passwordValidation}
            error={passwordError}
            setError={setPasswordError}
          />
          <div className="mb-5">
            <Link className="text-blue-500 hover:underline " href="/password">
              Forgot password ? Click here to reset
            </Link>
          </div>
        </Form>
        <div className="text-center p-3">
          <Link
            className="transition-colors duration-150 border border-blue-700 p-3 rounded-lg hover:bg-blue-700 hover:text-slate-100"
            href="/signup"
          >
            Dosen't have an account? Create it here
          </Link>
        </div>
      </section>
    </>
  );
}
