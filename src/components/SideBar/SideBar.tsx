import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css";
import { RootState } from "../../redux/store";
import { navLinks } from "../../constant";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const SideBar = () => {
  const userinfo = useSelector((state: RootState) => state.auth.user);
  // nav item class active
  const [navActive, setnavActive] = useState(0);

  const [mobilemenu, setmobilemenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    const token = localStorage.getItem("token");

    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "#FE0000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("https://test1.focal-x.com/api/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg);
          }
          localStorage.removeItem("token");
          navigate("/");
        } catch (error: any) {
          console.error(error);
        }
      }
    });
  };

  return (
    <>
      <div className="fixed md:hidden flex top-0 left-0 z-40 p-6">
        <TiThMenu
          size={30}
          onClick={() => {
            setmobilemenu(true);
          }}
        />
      </div>
      <div
        className={`SideBar md:flex hidden fixed top-0 left-0 z-40 md:px-10 md:py-6 md:w-[20%] w-full h-screen  bg-dimSecondary md:bg-opacity-100 bg-opacity-70 ${
          mobilemenu ? "!flex" : ""
        }`}
      >
        <div className="md:w-full w-[60%] p-4 h-full flex flex-col gap-8 bg-dimSecondary">
          {mobilemenu && (
            <IoClose
              size={60}
              onClick={() => {
                setmobilemenu(false);
              }}
            />
          )}
          <div className="logo border-l-4 pl-2 md:my-0 my-4 border-secondary md:w-50% ">
            <img
              src="/assets/images/Logo.png"
              className="w-20 "
              alt="focal x logo"
            />
          </div>
          <div className="profile flex flex-col items-center">
            <div className="img-box w-[128px] h-[128px] bg-dimGray rounded-full">
              <img
                src={userinfo.profile_image_url}
                className="w-full h-full object-cover"
                alt="user profile image"
              />
            </div>
            <h3 className="font-[700] sm:text-[17px] text-[14px] mt-5 text-center">
              {userinfo.user_name}
            </h3>
          </div>
          <div className="links h-full ">
            <ul className="h-full  flex flex-col items-center justify-between">
              <div className="navlink">
                {navLinks.map((el, index) => {
                  return (
                    <li key={index} className="mt-4 text-nowrap">
                      <Link
                        to={el.path}
                        className={`flex items-center gap-2 py-3 px-10 rounded-[4px] ${
                          navActive == index ? "bg-primary" : ""
                        } `}
                        onClick={() => {
                          setnavActive(index);
                        }}
                      >
                        {el.icon}
                        <span className="font-[500] text-[14px]">
                          {el.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </div>
              <li>
                <Link
                  to=""
                  className={`flex items-center gap-2 py-3 px-10 rounded-[4px]`}
                  onClick={handelLogout}
                >
                  <span className="font-[500] text-[14px]">Logout</span>
                  <IoIosLogOut />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
