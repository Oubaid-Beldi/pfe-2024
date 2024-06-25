import { ChangeEvent, useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";

import { TiUserAddOutline } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authServices";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  register,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import { AppDispatch, RootState } from "../../redux/sotre";

type Data = {
  name: string;
  email: string;
  password: string;
  password2: string;
};
const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state: RootState) => state.auth
  );
  const initData: Data = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const [formData, setFormData] = useState<Data>(initData);
  const { name, email, password, password2 } = formData;
  const [uCase, setUcase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSchar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const timesIcon = <FaTimes size={27} color="red" />;
  const checkIcon = <BsCheck2All size={27} color="green" />;
  const swtichIcon = (condition: boolean) => {
    if (condition) {
      return checkIcon;
    } else {
      return timesIcon;
    }
  };
  const HandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // check Lower and uppper case
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUcase(true);
    } else {
      setUcase(false);
    }
    // check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSchar(true);
    } else {
      setSchar(false);
    }
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a validate email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not much");
    }
    const userInfo = {
      name,
      email,
      password,
    };

    await dispatch(register(userInfo));
    await dispatch(sendVerificationEmail());
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-screen  bg-gray-100">
      {isLoading && <Loader />}
      <Card>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center pb-8">
            <TiUserAddOutline size={35} className="text-sky-400" />
            <h2 className="text-4xl font-bold text-sky-700">Register</h2>
          </div>

          <form className="w-full" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              required
              onChange={HandleInputChange}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              required
              onChange={HandleInputChange}
              className="mb-4 px-4 py-2 border rounded w-full"
            />
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
              onPaste={(e) => {
                e.preventDefault();
                toast.error("can not paste into input fields");

                return false;
              }}
            />
            {/* {Password Strength} */}
            <Card>
              <ul>
                <li className="flex flex-row items-center space-x-2">
                  <div>{swtichIcon(uCase)}</div>
                  <div className="font-bold text-gray-600">
                    {" "}
                    &nbsp; Lowercase & Uppercase
                  </div>
                </li>
                <li className="flex flex-row items-center space-x-2">
                  <div>{swtichIcon(num)}</div>
                  <div className="font-bold text-gray-600">
                    {" "}
                    &nbsp; number (0-9)
                  </div>
                </li>
                <li className="flex flex-row items-center space-x-2">
                  <div>{swtichIcon(sChar)}</div>
                  <div className="font-bold text-gray-600">
                    {" "}
                    &nbsp; Special Character(!@#%^&$*)
                  </div>
                </li>
                <li className="flex flex-row items-center space-x-2">
                  <div>{swtichIcon(passLength)}</div>
                  <div className="font-bold text-gray-600">
                    {" "}
                    &nbsp; At least 6 character
                  </div>
                </li>
              </ul>
            </Card>
            <button
              type="submit"
              className=" w-full mt-6 p-4 px-6 py-2 border rounded text-white bg-green-500 hover:bg-green-600"
            >
              Register
            </button>
          </form>
        </div>
        <div className="inline">
          <Link to="/" className="inline text-blue-500">
            Home
          </Link>
          <p className="inline px-2">Already have an account ?</p>
          <Link className="inline px-2 text-violet-500" to="/login">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
