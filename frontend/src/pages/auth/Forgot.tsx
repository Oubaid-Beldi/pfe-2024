import { useState } from "react";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authServices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/sotre";
import { RESET, forgotPassword } from "../../redux/features/auth/authSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { Loader } from "../../components/loader/Loader";

const Forgot = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const forgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter email");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    console.log(email);
    await dispatch(forgotPassword(email));
    await dispatch(RESET(), email);
  };

  return (
    <div className="flex justify-center items-center h-screen  bg-gray-100">
      {isLoading && <Loader />}
      <Card>
        <div className="flex  flex-col items-center">
          <div className="flex flex-col items-center justify-center pb-8">
            <AiOutlineMail size={35} className="text-sky-400" />
            <h2 className="text-4xl font-bold text-sky-700">Forgot Password</h2>
          </div>

          <form className="w-full" onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full"
            />

            <button
              type="submit"
              className=" w-full mt-6 p-4 px-6 py-2 border rounded text-white bg-green-500 hover:bg-green-600"
            >
              Get Reset Email
            </button>
          </form>
        </div>
        <div className="flex items-center justify-between">
          <Link to="/" className="inline text-blue-500">
            - Home
          </Link>

          <Link className="inline px-2 text-violet-500" to="/register">
            - Register
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;
