import { Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Products from "./DashbordPages/Products";
import AddProduct from "./DashbordPages/AddProduct";
import EditProduct from "./DashbordPages/EditProduct";
import ShowProduct from "./DashbordPages/ShowProduct";

const Dashboard = () => {
  return (
    <>
      <SideBar />
      <main className="fixed top-0 md:left-[20%] left-0 md:w-[80%] w-full h-screen py-6 px-16">
        <Routes>
          <Route path="" element={<Products />} />
          <Route path="AddProduct" element={<AddProduct />} />
          <Route path="EditProduct/:id" element={<EditProduct />} />
          <Route path="ShowProduct/:id" element={<ShowProduct />} />
        </Routes>
      </main>
    </>
  );
};

export default Dashboard;
