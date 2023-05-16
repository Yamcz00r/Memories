import { ChangeEvent } from "react";

interface FormControlProps {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export default function FormControl(props: FormControlProps) {
  return (
    <div className="w-full my-5">
      <input
        className={`transition-all duration-150 w-full rounded p-4 border text-xl outline-none border-gray-400 placeholder:text-slate-400 placeholder:text-xl focus:border-blue-400 focus:ring-2 ${
          props.error ? "border-red-400 focus:border-red-400 focus:ring-2" : ""
        }`}
        placeholder={props.label}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error ? (
        <p className="text-red-500 text-base m-1">{props.error}</p>
      ) : (
        ""
      )}
    </div>
  );
}
