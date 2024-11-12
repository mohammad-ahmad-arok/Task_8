import { ReactNode } from "react";
import "./Form.css";

interface FormProps {
  children: ReactNode;
}
const Form: React.FC<FormProps> = ({ children }) => {
  return <form>{children}</form>;
};

interface TextFaildProps {
  label: string;
  placeholder: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onchange: any;
  isRequired: boolean;
}
const TextFaild: React.FC<TextFaildProps> = ({
  label,
  placeholder,
  id,
  name,
  type,
  value,
  onchange,
  isRequired,
}) => {
  return (
    <div className="w-full mt-3 ">
      <label
        className="block text-dimBlack text-[14px] font-[500] mb-1"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="text-[12px] custom-input w-full px-4 py-2.5 border border-dimGray rounded-[4px] shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-primary hover:shadow-lg hover:border-primary"
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onchange}
        required={isRequired}
      />
    </div>
  );
};

interface FileProps {
  label: string;
  name: string;
  onchange: any;
  className?: string;
}
const File: React.FC<FileProps> = ({ label, name, onchange, className }) => {
  return (
    <div className="rounded-lg overflow-hidden ">
      <label className="block text-dimBlack text-[14px] font-[500] mb-1">
        {label}
      </label>
      <div className="md:flex">
        <div className="">
          <div
            className={`
            relative w-[100px] h-[100px]  rounded-[4px] border border-dashed border-dimBlack
           bg-[#F8F8FF] flex justify-center items-center shadow-lg
            hover:shadow-xl transition-shadow duration-300 ease-in-out
            ${className}`}
          >
            <div className="absolute flex flex-col items-center">
              <img
                alt="File Icon"
                className="w-10"
                src="/assets/images/Upload icon.png"
              />
            </div>
            <input
              onChange={onchange}
              name={name}
              className="opacity-0 cursor-pointer "
              type="file"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface SearchProps {
  placeholder: string;
  name: string;
  value?: string;
  onchange: any;
}
const Search: React.FC<SearchProps> = ({
  placeholder,
  name,
  value,
  onchange,
}) => {
  return (
    <div className="relative w-full">
      <input
        placeholder={placeholder}
        className="input text-[14px] font-[400] shadow-sm border border-dimGray focus:border focus:border-primary px-5 py-2.5 rounded-lg w-full transition-all  outline-none"
        name={name}
        type="search"
        value={value}
        onChange={onchange}
      />
      <svg
        className="size-6 absolute top-3 right-3 text-gray-500"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Form;
export { TextFaild, File, Search };
