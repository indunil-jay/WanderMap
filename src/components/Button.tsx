type Props = {
  children: React.ReactNode;
};

const Button = ({ children }: Props) => {
  return (
    <button className="bg-primary font-medium text-light-1 transition-colors  hover:text-light uppercase text-[1.2rem] px-10 py-5 rounded-md">
      {children}
    </button>
  );
};

export default Button;
