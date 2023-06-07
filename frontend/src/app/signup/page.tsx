"use client";

import Input from "@/components/Input";
import Form from "@/components/Form";
import { FormEvent, useState } from "react";
import { ErrorState } from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { insertToken } from "@/store/slices/AuthSlice";
import { TokenResponse } from "@/types/auth";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState<ErrorState>({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState<ErrorState>({
    isError: false,
    message: "",
  });
  const [usernameError, setUsernameError] = useState<ErrorState>({
    isError: false,
    message: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (passwordError.isError || usernameError.isError || emailError.isError) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        console.log("Something went wrong!");
        throw new Error("Something went wrong");
      }
      const data = await response.json();

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
        throw new Error("Can't login with this credentials");
      }
      const { token }: TokenResponse = await tokenRequest.json();

      dispatch(insertToken(token));

      localStorage.setItem("token", token);

      router.push("/home");
    } catch (error) {
      console.log(error);
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

  function usernameValidation(value: string) {
    if (value.trim().length === 0) {
      return false;
    }
    return true;
  }

  return (
    <>
      <header className="p-7 mb-20">
        <div className="font-bold text-3xl md:text-4xl xl:text-3xl">
          Memories
        </div>
      </header>
      <section className="sm:w-1/2 md:w-3/5 xl:w-1/3 mx-auto">
        <div className="font-semibold text-2xl text-center mb-5 md:text-3xl xl:text-2xl">
          Sign Up
        </div>
        <Form type="signup" className="p-5 flex flex-col" onSubmit={onSubmit}>
          <Input
            setValue={setUsername}
            type="text"
            label="Username"
            validation={usernameValidation}
            setError={setUsernameError}
            error={usernameError}
          />
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
          <div className="text-sm mb-6">
            <p className="text-gray-400">Password requirements</p>
            <ul className="list-disc list-inside">
              <li>Password must contain at least one lowercase letter</li>
              <li>Password must contain at least one uppercase letter</li>
              <li>Password must contain at least one digit</li>
              <li>Password must have at least 8 characters</li>
            </ul>
          </div>
        </Form>
        <div className="text-center p-3 mb-3">
          <Link
            className="transition-colors duration-150 border border-blue-700 p-3 rounded-lg hover:bg-blue-700 hover:text-slate-100"
            href="/"
          >
            Already created an account? Log In here!
          </Link>
        </div>
      </section>
    </>
  );
}
