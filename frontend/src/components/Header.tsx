import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RESET, logout } from "../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "./protect/hiddenLinks";
import { AppDispatch } from "../redux/sotre";
import { UserName } from "../pages/profile/Profile";

const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-blue-400 p-3">
      <nav className="flex justify-evenly items-center">
        <Link to={"/"} className="text-white font-bold mx-2">
          Onrtech
        </Link>
        <ul className="flex items-center">
          <ShowOnLogin>
            <li className="flex items-center mx-2">
              <FaUserCircle className="text-blue-600 mr-1" />
              <UserName />
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li className="mx-2">
              <button className="text-white border border-blue-50 rounded-md bg-blue-500 p-1">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li className="mx-2">
              <NavLink to="/profile" className="text-white">
                Profile
              </NavLink>
            </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li className="mx-2">
              <button
                className="text-white border border-blue-50 rounded-md bg-blue-800 p-1"
                onClick={logoutUser}
              >
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
