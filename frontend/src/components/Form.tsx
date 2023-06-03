"use client";
import { FormEvent } from "react";

type FormProps = {
  onSubmit: (event: FormEvent) => void;
  className?: string;
  children?: React.ReactNode;
};

function Form({ onSubmit, children, className }: FormProps) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
