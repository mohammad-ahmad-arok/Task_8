import { useState, ChangeEvent, FormEvent } from "react";
import Form, { File, TextFaild } from "../components/Form/Form";
import styles from "../Setyle";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Swal from "sweetalert2";
import axios from "axios";

interface Credentials {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_image: File | any;
}

interface LoginProps {
  setLoading: (loading: boolean) => void;
}

const SignUp: React.FC<LoginProps> = ({ setLoading }) => {
  const [credentials, setCredentials] = useState<Credentials>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector(
    (state: RootState) => state.auth.error || { error: null }
  );
  // message setings
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    background: "#F2EAE1",
    color: "#FE0000",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "profile_image" && files) {
      setCredentials({ ...credentials, profile_image: files[0] });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      // Set up FormData to send file
      const formData = new FormData();
      formData.append("first_name", credentials.first_name);
      formData.append("last_name", credentials.last_name);
      formData.append(
        "user_name",
        `${credentials.first_name}_${credentials.last_name}`
      );
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append(
        "password_confirmation",
        credentials.password_confirmation
      );
      if (credentials.profile_image) {
        formData.append("profile_image", credentials.profile_image);
      }

      // Send the request using Axios
      const response = await axios.post(
        "https://test1.focal-x.com/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(response.data.message || "register failed");
      }

      const data = response.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        isAuthenticated: true,
        payload: data.data.user,
      });
      localStorage.setItem("token", data.data.token);
      navigate("/Dashboard");
    } catch (err: any) {
      Toast.fire({
        icon: "error",
        title: err.response.data.message || "An unknown error occurred",
      });
      if (error instanceof Error) {
        dispatch({ type: "LOGIN_FAILURE", error: err.response.data.message });
      } else {
        dispatch({ type: "LOGIN_FAILURE", error: "An unknown error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="md:p-0 p-4 bg-gradient-to-r from-primary to-secondary h-screen flex items-center justify-center">
      <div className="main bg-dimWhite w-fit md:px-8 px-4 md:py-2 py-6 rounded-[20px]">
        <div className="header flex justify-center">
          <img
            src="/assets/images/Logo.png"
            alt="focalX logo"
            className="xl:w-[150px] w-[50%]"
          />
        </div>
        <div className="body mt-2">
          <div className="head text-center">
            <h1 className={`${styles.heading}`}>Sign up</h1>
            <p className={`${styles.paragraph} mt-2`}>
              Fill in the following fields to create an account.
            </p>
          </div>
          <div className="form mt-2">
            <Form>
              <div className="flex flex-wrap md:flex-nowrap items-end md:gap-6 gap-1">
                <TextFaild
                  id="first_name"
                  label="Name"
                  name="first_name"
                  type="text"
                  onchange={handleChange}
                  placeholder="First Name"
                  value={credentials.first_name}
                  isRequired={true}
                />
                <TextFaild
                  id="last_name"
                  label=""
                  name="last_name"
                  type="text"
                  onchange={handleChange}
                  placeholder="Last Name"
                  value={credentials.last_name}
                  isRequired={true}
                />
              </div>
              <div className="flex flex-wrap md:flex-nowrap items-end md:gap-6 gap-1">
                <TextFaild
                  id="Email"
                  label="Email"
                  name="email"
                  type="email"
                  onchange={handleChange}
                  placeholder="Enter your email"
                  value={credentials.email}
                  isRequired={true}
                />
              </div>
              <div className="flex flex-wrap md:flex-nowrap items-end md:gap-6 gap-1">
                <TextFaild
                  id="Password"
                  name="password"
                  label="Password"
                  type="password"
                  onchange={handleChange}
                  placeholder="Enter password"
                  value={credentials.password}
                  isRequired={true}
                />
                <TextFaild
                  id="password_confirmation"
                  name="password_confirmation"
                  label=""
                  type="password"
                  onchange={handleChange}
                  placeholder="Re-enter your password"
                  value={credentials.password_confirmation}
                  isRequired={true}
                />
              </div>
              <div className="flex mt-2">
                <File
                  name="profile_image"
                  label="Profile Image"
                  onchange={handleChange}
                />
              </div>

              <Button
                Label="SIGN UP"
                className="mt-4 w-full"
                onclick={handleSubmit}
                type="submit"
              />
            </Form>
          </div>
        </div>
        <div className="footer mt-4 flex justify-center">
          <p>
            Do you have an account?
            <Link to="/" className="text-primary pl-2 cursor-pointer">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
