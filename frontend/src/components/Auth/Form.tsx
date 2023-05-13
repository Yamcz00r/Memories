import { useState, ChangeEvent } from "react";
import FormControl from "./FormControl";

export type Error = {
  message: string;
  isError: boolean;
};

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [passwordErr, setPasswordErr] = useState("");

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(event.target.value)) {
      setEmailErr("Thats not the email");
    } else {
      setEmailErr("");
    }
    setEmail(event.target.value);
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value.trim().length === 0) {
      setPasswordErr("Fill this pole");
    }
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!pattern.test(event.target.value)) {
      setPasswordErr("Your password dont meet the requirements");
    }
    setPassword(event.target.value);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl
        type="email"
        name="email"
        label="Email"
        value={email}
        onChange={onEmailChange}
        error={emailErr}
      />
      <FormControl
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={onPasswordChange}
        error={passwordErr}
      />
      <div className="text-xl underline cursor-pointer mb-6">
        Forgot password ?
      </div>
      <button className="w-full bg-blue-500 font-semibold transition-colors duration-100 rounded-md text-xl p-5 text-white hover:bg-blue-600">
        Sign in
      </button>
    </form>
  );
}
