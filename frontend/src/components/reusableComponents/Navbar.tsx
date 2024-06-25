import { t } from "i18next";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector";
import Linkslist from "./LinksList";
import Logo from "./Logo";
import MobileNavbar from "./MobileNavbar";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import {
  AdminLink,
  AuthorLink,
  ShowOnLogin,
  ShowOnLogout,
  UserLink,
} from "../protect/hiddenLinks";
import { UserName } from "../../pages/profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { RESET, logout, selectUser } from "../../redux/features/auth/authSlice";
import { AppDispatch } from "../../redux/sotre";
import SingleNavLink from "./SingleNavLink";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const user = useSelector(selectUser);

  const handleNav = () => {
    setNav(!nav);
  };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full pb-2">
      <div className="mx-auto pt-2 w-12/12  h-full flex justify-evenly items-center flex-row">
        <Logo />
        <div className="hidden h-full xl:flex flex-row text-lg justify-evenly items-center w-6/12 text-gray-700">
          <ShowOnLogout>
            <Linkslist />
          </ShowOnLogout>
          <ShowOnLogin>
            <UserLink>
              <SingleNavLink value="Profile" path="/profile" />
              <SingleNavLink value="Services" path="/services" />
              <SingleNavLink value="Get in Touch" path="/about" />
              <SingleNavLink value="Tech Insights" path="/techInsight" />
              <SingleNavLink value="Jobs openings" path="/careers" />
            </UserLink>
            <AdminLink>
              <SingleNavLink value="Profile" path="/profile" />
              <SingleNavLink value="Users" path="/users" />
              <SingleNavLink value="Subs" path="/subscribers" />
              <SingleNavLink value="Forms" path="/forms" />
              <SingleNavLink value="Jobs" path="/ManageJobs" />
              <SingleNavLink value="Articles" path="/ManageArticles" />
              <SingleNavLink value="Job Apps" path="/applications" />
            </AdminLink>

            <AuthorLink>
              <SingleNavLink value="Profile" path="/profile" />
              <SingleNavLink value="My Articles" path="/editorArticles" />
              <SingleNavLink value="My Job offers" path="/editorJobs" />
            </AuthorLink>
          </ShowOnLogin>
        </div>
        <div className="flex flex-col items-center justify-between ">
          <LanguageSelector />
        </div>
        <ShowOnLogin>
          <li className="flex items-center mx-2">
            {/* <FaUserCircle className="text-blue-600 mr-1" /> */}
            <img
              src={user?.photo}
              alt="User Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500"
            />
            <UserName />
          </li>
        </ShowOnLogin>
        <ShowOnLogout>
          <Link to={"login"}>
            {" "}
            <Button
              visibility="hidden xl:block md:py-2 md:px-2.5 lg:py-1.5 lg:px-4"
              value={t("signUp")}
            />
          </Link>
        </ShowOnLogout>

        <ShowOnLogin>
          <Button
            visibility="hidden xl:block md:py-1 md:px-2.5 lg:py-1.5 lg:px-4"
            value="Logout"
            onClick={logoutUser}
          />
        </ShowOnLogin>

        <div onClick={handleNav} className="block xl:hidden">
          {nav ? (
            <AiOutlineClose
              className="text-blue-400 cursor-pointer mt-1"
              size={23}
            />
          ) : (
            <AiOutlineMenu
              className="text-blue-400 cursor-pointer mt-1"
              size={23}
            />
          )}
        </div>
      </div>
      <MobileNavbar nav={nav} />
    </div>
  );
};
export default Navbar;
