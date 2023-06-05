"use client";

import Input from "@/components/Input";
import Form from "@/components/Form";
import { FormEvent, useState } from "react";
import { Error } from "@/components/Input";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<Error>({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState<Error>({
    isError: false,
    message: "",
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
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
