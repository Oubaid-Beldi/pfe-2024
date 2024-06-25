import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";

import { GrInsecure } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/sotre";
import { toast } from "react-toastify";
import {
  RESET,
  loginWithCode,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";

const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState<string>("");
  const { email } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const resendLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    dispatch(RESET());
  };

  const loginUserWithCode = async (e) => {
    e.preventDefault();
    if (loginCode === "") {
      return toast.error("Please fill in the login code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Acess code must be only 6 characters");
    }
    const code = {
      loginCode,
    };
    await dispatch(loginWithCode({ code, email }));
    dispatch(RESET());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
  });

  return (
    <div className="flex justify-center items-center h-screen  bg-gray-100">
      {isLoading && <Loader />}
      <Card>
        <div className="flex  flex-col items-center">
          <div className="flex flex-col items-center justify-center pb-8">
            <GrInsecure size={35} className="text-sky-400" />
            <h2 className="text-4xl font-bold text-sky-700">
              Enter Access Code
            </h2>
          </div>

          <form className="w-full" onSubmit={loginUserWithCode}>
            <input
              type="text"
              placeholder="Access Code"
              value={loginCode}
              name="loginCode"
              onChange={(e) => {
                setLoginCode(e.target.value);
              }}
              className="mb-4 px-4 py-2 border rounded w-full"
            />

            <button
              type="submit"
              className=" w-full mt-6 p-4 px-6 py-2 border rounded text-white bg-green-500 hover:bg-green-600"
            >
              Proceed To Login
            </button>
          </form>
          <p className="mx-auto">check your email for login access</p>
        </div>
        <div className="flex items-center justify-between">
          <Link to="/" className="inline text-blue-500">
            - Home
          </Link>

          <b
            className="inline px-2 text-violet-800 hover:cursor-pointer hover:underline"
            onClick={resendLoginCode}
          >
            - Resend Code
          </b>
        </div>
      </Card>
    </div>
  );
};

export default LoginWithCode;
