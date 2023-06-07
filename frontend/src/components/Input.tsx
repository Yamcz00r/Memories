"use client";

import { ChangeEvent, Dispatch, SetStateAction, FocusEvent } from "react";

type InputProps = {
  type: string;
  validation: (value: string) => boolean;
  label: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: ErrorState;
  setError: Dispatch<SetStateAction<ErrorState>>;
};

export type ErrorState = {
  isError: boolean;
  message: string;
};

function Input({
  type,
  validation,
  label,
  setValue,
  error,
  setError,
}: InputProps) {
  function onBlur(e: FocusEvent<HTMLInputElement>) {
    if (e.currentTarget.value.trim().length === 0) {
      setError({
        isError: true,
        message: `${label} cannot be empty!`,
      });
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    const isValidate = validation(e.target.value);
    if (!isValidate) {
      setError({
        isError: true,
        message: `${label} is not valid!`,
      });
    } else {
      setError({
        isError: false,
        message: "",
      });
    }
  }

  return (
    <label className="block my-2">
      <span className="block text-md font-medium text-slate-700">
        {type === "password" ? "Password (at least 6 characters)" : `${label}`}
      </span>
      <input
        type={type}
        onBlur={onBlur}
        onChange={onChange}
        className={`my-2 text-md bg-gray-50 border text-gray-900 rounded-lg outline-none  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  ${
          error.isError
            ? "border-red-500 focus:ring-red-500  dark:focus:ring-red-500 "
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        }`}
      />
      {error.isError && (
        <p className="block text-md text-red-500">{error.message}</p>
      )}
    </label>
  );
}

export default Input;
