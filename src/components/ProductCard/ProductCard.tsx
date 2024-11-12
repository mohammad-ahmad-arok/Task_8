import React from "react";
import Button from "../Button/Button";
import "./ProductCard.css";
import { Link } from "react-router-dom";

interface cardProps {
  id: string;
  name: string;
  image_url: string;
}

const ProductCard: React.FC<cardProps> = ({ id, name, image_url }) => {
  return (
    <div className="relative overflow-hidden w-52 h-52 rounded-2xl cursor-pointer text-2xl font-bold bg-dimSecondary">
      <Link to={`ShowProduct/${id}`}>
        <div className="z-10 absolute w-full h-full peer" />
        <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44  peer-hover:bg-dimSecondary bg-transparent peer-hover:bg-opacity-70 transition-all duration-500" />
        <div className="absolute flex flex-col text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-around peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44  peer-hover:bg-dimSecondary bg-transparent peer-hover:bg-opacity-70 transition-all duration-500">
          <div className="">
            <h6 className="md:text-[30px] text-[18px] font-[500]">{name}</h6>
            <div className="z-30 btnContainer flex gap-3 justify-around">
              <Link to={`EditProduct/${id}`}>
                <Button Label="Edit" className="!py-0 !px-4" />
              </Link>
              <Button Label="delete" className="!bg-danger !py-0 !px-4" />
              {/* <Link to={`ShowProduct/${id}`}>
              <Button Label="delete" className="!bg-danger !py-0 !px-4" />
            </Link> */}
            </div>
          </div>
        </div>
        <div className="w-full h-full items-center justify-center flex uppercase">
          <img
            src={image_url ? image_url : "/assets/images/defultProductImg.png"}
            alt="defultProductImg"
            className="w-full h-full object-cover "
          />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
