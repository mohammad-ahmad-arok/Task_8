import { useState, ChangeEvent, FormEvent } from "react";
import Form, { TextFaild } from "../components/Form/Form";
import styles from "../Setyle";
import Button from "../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Swal from "sweetalert2";

interface Credentials {
  email: string;
  password: string;
}

interface LoginProps {
  setLoading: (loading: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoading }) => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
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
    background: "#FDFDFD",
    color: "#FE0000",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await fetch("https://test1.focal-x.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Login failed");
      }

      const data = await response.json();
      dispatch({
        type: "LOGIN_SUCCESS",
        isAuthenticated: true,
        payload: data.user,
      });
      localStorage.setItem("token", data.token);
      navigate("/Dashboard");
    } catch (err: any) {
      console.log(err);

      Toast.fire({
        icon: "error",
        title: err,
      });
      if (error instanceof Error) {
        dispatch({ type: "LOGIN_FAILURE", error: error.message });
      } else {
        dispatch({ type: "LOGIN_FAILURE", error: "An unknown error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary to-secondary h-screen flex items-center justify-center">
      <div className="main bg-dimWhite w-fit px-8 py-11 rounded-[20px]">
        <div className="header flex justify-center">
          <img
            src="/assets/images/Logo.png"
            alt="focalX logo"
            className="xl:w-[150px] w-[50%]"
          />
        </div>
        <div className="body mt-8">
          <div className="head text-center">
            <h1 className={`${styles.heading}`}>Sign In</h1>
            <p className={`${styles.paragraph} mt-2`}>
              Enter your credentials to access your account
            </p>
          </div>
          <div className="form mt-6">
            <Form>
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
              <TextFaild
                id="Password"
                name="password"
                label="Password"
                type="password"
                onchange={handleChange}
                placeholder="Enter your password"
                value={credentials.password}
                isRequired={true}
              />
              <Button
                Label="SIGN IN"
                className="mt-6 w-full"
                onclick={handleSubmit}
                type="submit"
              />
            </Form>
          </div>
        </div>
        <div className="footer mt-4 flex justify-center">
          <p>
            Don’t have an account?
            <Link to="/SignUp" className="text-primary pl-2 cursor-pointer">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
