import { ChangeEvent } from "react";

type Props = {
  type: string;
  id: string;
  disable?: boolean;
  children?: React.ReactNode;
  placeholderText?: string;
  value?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  type,
  disable = false,
  id,
  children,
  placeholderText,
  value,
  handleChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[18px] font-medium">
        {children}
      </label>
      <input
        onChange={handleChange}
        value={value}
        type={type}
        name={id}
        id={id}
        disabled={disable}
        className="w-full  rounded-lg bg-light-1 text-[20px] text-dark-1 px-5 py-3 font-medium
            border-1 border-transparent shadow-md shadow-dark-3 placeholder-light-2
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary 
            disabled:bg-light-1/60 disabled:text-dark-3 disabled:border-light-0/50 disabled:shadow-none disabled:placeholder-dark-3
            invalid:border-red-600 invalid:text-red-600
            focus:invalid:border-red-600 focus:invalid:ring-red-600
            caret-dark-3/50
           
            "
        placeholder={placeholderText}
        required
      />
    </div>
  );
};

export default Input;
