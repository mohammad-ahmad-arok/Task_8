import "./Button.css";

interface ButtonProps {
  className: string;
  onclick?: any;
  Label: string;
  type?: any;
}
const Button: React.FC<ButtonProps> = ({ className, onclick, Label, type }) => {
  return (
    <button
      className={`rounded-[4px] py-2.5 px-8 font-[400]  bg-primary text-dimWhite 
      relative overflow-hidden group transition-all ease-out duration-300 text-[14px]  ${className}`}
      type={type}
      onClick={onclick}
    >
      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease" />

      <span className="relative  ">{Label}</span>
    </button>
  );
};

export default Button;
