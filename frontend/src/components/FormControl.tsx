type FormControlProps = {
  type: string;
  name: string;
  label: string;
  value?: string;
};

const FormControl = (props: FormControlProps) => {
  return (
    <div className="my-3 p-3">
      <label className="mx-2  text-xl" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="outline-none border border-gray-300"
        id={props.name}
        type={props.type}
        value={props.value}
      />
    </div>
  );
};

export default FormControl;
