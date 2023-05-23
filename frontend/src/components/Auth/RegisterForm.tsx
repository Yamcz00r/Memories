import { useState, ChangeEvent } from "react";
import FormControl from "./FormControl";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
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

  function onUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value.trim().length === 0) {
        setUsernameErr("This cannot be empty")
    } else {
        setUsernameErr("")
    }
    setUsername(event.target.value)
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!pattern.test(event.target.value)) {
      setPasswordErr("Your password dont meet the requirements");
      // Password must be at least 8 characters long
      // Password must contain at least one lowercase letter
      // Password must contain at least one uppercase letter
      // Password must contain at least one digit
    } else {
      setPasswordErr("");
    }
    setPassword(event.target.value);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (emailErr && passwordErr && usernameErr) {
      console.log("INVALID DATA");
      return;
    }
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
      <FormControl
        type="text"
        name="username"
        label="Username"
        value={username}
        onChange={onUsernameChange}
        error={usernameErr}
      />
      <button className="w-full bg-blue-500 font-semibold transition-colors duration-100 rounded-md text-xl p-5 text-white hover:bg-blue-600">
        Create an account
      </button>
    </form>
  );
};