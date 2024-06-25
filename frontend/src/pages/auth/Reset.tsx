import { useState } from "react";
import Card from "../../components/card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";

import { MdPassword } from "react-icons/md";
import { Loader } from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";
type Data = {
  password: string;
  password2: string;
};

const initData: Data = {
  password: "",
  password2: "",
};

const Reset = () => {
  const dispathc = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(initData);
  const { password, password2 } = formData;
  const { resetToken } = useParams();

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const reset = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return toast.error("password must be up to 6 character");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      password,
    };
    await dispathc(resetPassword({ userData, resetToken }));
    await dispathc(RESET(userData));
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen  bg-gray-100">
      {isLoading && <Loader />}
      <Card>
        <div className="flex  flex-col items-center">
          <div className="flex flex-col items-center justify-center pb-8">
            <MdPassword size={35} className="text-sky-400" />
            <h2 className="text-4xl font-bold text-sky-700">Reset Password</h2>
          </div>

          <form className="w-full" onSubmit={reset}>
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={HandleInputChange}
            />
            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={HandleInputChange}
            />
            <button
              type="submit"
              className=" w-full mt-6 p-4 px-6 py-2 border rounded text-white bg-green-500 hover:bg-green-600"
            >
              Reset Password
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

export default Reset;
