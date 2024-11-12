import { ChangeEvent, FormEvent, useState } from "react";
import Form, { File, TextFaild } from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const token = localStorage.getItem("token");

  interface prodactInfo {
    name: any;
    price: any;
    image_url: File | any;
  }
  const [prodactInfo, setProdactInfo] = useState<prodactInfo>({
    name: "",
    price: "",
    image_url: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image_url" && files) {
      setProdactInfo({ ...prodactInfo, image_url: files[0] });
    } else {
      setProdactInfo({ ...prodactInfo, [name]: value });
    }
  };

  // message setings
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    background: "#F2EAE1",
    color: "#000",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", prodactInfo.name);
      formData.append("price", prodactInfo.price);
      if (prodactInfo.image_url) {
        formData.append("image", prodactInfo.image_url);
      }

      const response = await axios.post(
        "https://test1.focal-x.com/api/items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(response.data.message || "register failed");
      }

      const data = response.data;
      console.log(data);
      Toast.fire({
        icon: "success",
        title: "data added successfully",
      });
    } catch (err: any) {
      console.log(err);

      Toast.fire({
        icon: "error",
        title: err.response.data.message || "An unknown error",
      });
    }
  };
  return (
    <section className="flex flex-col items-center">
      <div className="header w-full text-start">
        <h1 className="font-[600] md:text-[60px] text-[20px]">ADD NEW ITEM</h1>
      </div>
      <div className="body w-full">
        <Form>
          <div className="flex w-full gap-4 flex-wrap">
            <div className="w-[45%]">
              <TextFaild
                id="name"
                isRequired={true}
                label="Name"
                name="name"
                onchange={handleChange}
                placeholder="Enter the product name"
                value={prodactInfo.name}
                type="text"
              />
              <TextFaild
                id="price"
                isRequired={true}
                label="Price"
                name="price"
                onchange={handleChange}
                placeholder="Enter the product price"
                value={prodactInfo.price}
                type="text"
              />
            </div>
            <div className="w-1/2">
              <File
                label="Image"
                name="image_url"
                onchange={handleChange}
                className="!w-full !h-[200px]"
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="footer mt-4 flex items-center">
        <Button Label="Save" className="" onclick={handleSubmit} />
      </div>
    </section>
  );
};

export default AddProduct;
