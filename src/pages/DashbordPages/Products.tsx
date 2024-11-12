import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { Search } from "../../components/Form/Form";
import ProductCard from "../../components/ProductCard/ProductCard";
import { RootState } from "../../redux/reducer";
import {
  fetchProductsFailure,
  fetchProductsSuccess,
  filterSearch,
} from "../../redux/actions/productActions";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Products = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [paginationActive, setPaginationActive] = useState(1);
  const { products } = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://test1.focal-x.com/api/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        dispatch(fetchProductsSuccess(data));
      } catch (error: any) {
        dispatch(fetchProductsFailure(error));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPaginationActive((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPaginationActive((prev) => prev - 1);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSearch(event.target.value));
    setCurrentPage(1);
  };
  console.log(products);

  return (
    <section className="Products flex flex-col items-center">
      <div className="header flex justify-center w-8/12">
        <Search
          name="search"
          placeholder="Search product by name"
          onchange={(event: any) => {
            handleSearchChange(event);
          }}
        />
      </div>
      <div className="products w-full mt-4">
        <div className="header flex justify-end">
          <Link to="AddProduct">
            <Button Label="ADD NEW PRODUCT" className="" onclick="" type="" />
          </Link>
        </div>
        <div className="body w-full flex flex-wrap gap-4 justify-center items-center">
          {currentProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image_url={product.image_url}
            />
          ))}
        </div>
        <div className="pagination  flex justify-start w-full mt-6">
          <button
            className="flex items-center justify-center !rounded-full !p-0 !w-10 !h-10 ml-2 !bg-transparent border !border-dimGray !text-dimBlack"
            onClick={() => {
              handlePrevPage();
            }}
          >
            <IoIosArrowBack />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              Label={(index + 1).toString()}
              onclick={() => {
                handlePageChange(index + 1);
                setPaginationActive(index + 1);
              }}
              type=""
              className={`!rounded-full !p-0 !w-10 !h-10 ml-2 !bg-transparent border !border-dimGray !text-dimBlack ${
                paginationActive === index + 1
                  ? " !bg-secondary !text-dimWhite "
                  : ""
              } `}
            />
          ))}
          <button
            className="flex items-center justify-center !rounded-full !p-0 !w-10 !h-10 ml-2 !bg-transparent border !border-dimGray !text-dimBlack"
            onClick={() => {
              handleNextPage();
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
