"use client";
import { FormEvent } from "react";

type FormProps = {
  onSubmit: (event: FormEvent) => void;
  className?: string;
  children?: React.ReactNode;
  type: string;
};

function Form({ onSubmit, children, className, type }: FormProps) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
      <button
        type="submit"
        className="text-white self-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm min-w-min sm:w-auto px-5 py-2.5 text-center my-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {type === "signup" ? "Sign up" : "Log In"}
      </button>
    </form>
  );
}

export default Form;
