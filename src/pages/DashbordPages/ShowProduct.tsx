import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowProduct = () => {
  const token = localStorage.getItem("token");

  const { id } = useParams();
  interface prodactInfo {
    name: any;
    image_url: string;
    updated_at: string;
    created_at: string;
    price: number;
  }
  const [prodactInfo, setProdactInfo] = useState<prodactInfo>({
    name: "",
    image_url: "",
    updated_at: "",
    created_at: "",
    price: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://test1.focal-x.com/api/items/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setProdactInfo({
          name: data.name,
          image_url: data.image_url,
          updated_at: data.updated_at,
          created_at: data.created_at,
          price: data.price,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, token]);

  return (
    <section className="flex flex-col items-center">
      <div className="header w-full text-start">
        <h1 className="font-[600] md:text-[60px] text-[20px]">
          {prodactInfo.name}
        </h1>
      </div>
      <div className="body ">
        <div className="img-box w-[370px] h-[370px]">
          <img
            src={prodactInfo.image_url || "/assets/images/defultProductImg.png"}
            alt="roduct Img"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="footer flex flex-wrap">
        <p className="font-[600] md:text-[60px] text-[20px]">
          Price:
          <span className="font-[500] md:text-[40px] text-[14px] text-dimGray">
            {prodactInfo.price}
          </span>
        </p>
        <p className="font-[600] md:text-[60px] text-[20px]">
          Created At:
          <span className="font-[500] md:text-[40px] text-[14px] text-dimGray">
            {prodactInfo.created_at}
          </span>
        </p>
        <p className="font-[600] md:text-[60px] text-[20px]">
          Updated At:
          <span className="font-[500] md:text-[40px] text-[14px] text-dimGray">
            {prodactInfo.updated_at}
          </span>
        </p>
      </div>
    </section>
  );
};

export default ShowProduct;
