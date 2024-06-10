import { MouseEvent } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  fill?: boolean;
  disable?: boolean;
};

const Button = ({ children, onClick, fill = true, disable = false }: Props) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`font-medium text-light-1 transition-colors border  ${
        fill
          ? "border-transparent bg-primary "
          : "border-light-1 hover:border-light"
      }  hover:text-light uppercase text-[1.2rem] px-10 py-4 rounded-md disabled:opacity-25`}
    >
      {children}
    </button>
  );
};

export default Button;
