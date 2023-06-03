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

  console.log(email, password);

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
        <div className="font-bold text-3xl ">Memories</div>
      </header>
      <section className="w-1/3 mx-auto">
        <div className="font-semibold text-2xl text-center mb-5">Log In</div>
        <Form className="p-5 flex flex-col" onSubmit={onSubmit}>
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
          <div>
            <Link className="text-underline text-blue-400" href="/password">
              Forgot password ? Click here to reset
            </Link>
          </div>
          <button
            type="submit"
            className="text-white self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log In
          </button>
        </Form>
      </section>
    </>
  );
}
