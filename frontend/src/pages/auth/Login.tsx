import { ChangeEvent, useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { BiLogIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authServices";
import {
  RESET,
  login,
  loginWithGoogle,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import { AppDispatch, RootState } from "../../redux/sotre";
import { GoogleLogin } from "@react-oauth/google";

type formDataType = {
  email: string;
  password: string;
};
const Login = () => {
  const initialState: formDataType = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState<formDataType>(initialState);
  const HandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, isError, twoFactor } = useSelector(
    (state: RootState) => state.auth
  );
  const { email, password } = formData;
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a validate email");
    }

    const userInfo = {
      email,
      password,
    };

    await dispatch(login(userInfo));
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
      console.log(email);
    }
    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      console.log(email);

      navigate(`/LoginWithCode/${email}`);
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, email, isError, twoFactor]);
  const googleLogin = async (credentialResponse) => {
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
    console.log(credentialResponse);
  };

  return (
    <div className="flex justify-center items-center h-screen  bg-gray-100">
      {isLoading && <Loader />}
      <Card>
        <div className="flex  flex-col items-center">
          <div className="flex flex-col items-center justify-center pb-8">
            <BiLogIn size={35} className="text-sky-400" />
            <h2 className="text-4xl font-bold text-sky-700">Login</h2>
          </div>
          {/* <button className="mb-4 px-6 py-2 border rounded text-white bg-blue-500 hover:bg-blue-600">
            Login with Google
          </button> */}
          {/* Login with google */}
          <GoogleLogin
            onSuccess={googleLogin}
            onError={() => {
              console.log("Login Failed");
              toast.error("Login failed");
            }}
          />

          <div className="m-2">
            <h2>Or</h2>
          </div>
          <form className="w-full" onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={HandleInputChange}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={HandleInputChange}
            />

            <button
              type="submit"
              className=" w-full mt-6 p-4 px-6 py-2 border rounded text-white bg-green-500 hover:bg-green-600"
            >
              LogIn
            </button>
          </form>
          <Link to="/forgot" className="text-violet-400">
            Forgot Password
          </Link>
        </div>
        <div className="inline">
          <Link to="/" className="inline text-blue-500">
            Home
          </Link>
          <p className="inline px-2">Don't have an account ?</p>
          <Link className="inline px-2 text-violet-500" to="/register">
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
