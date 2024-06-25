import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import SingleNavLink from "./SingleNavLink";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  AdminLink,
  AuthorLink,
  ShowOnLogin,
  ShowOnLogout,
  UserLink,
} from "../protect/hiddenLinks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/sotre";
import { RESET, logout, selectUser } from "../../redux/features/auth/authSlice";
import Linkslist from "./LinksList";
type props = {
  nav: boolean;
};
const MobileNavbar = ({ nav }: props) => {
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState("");

  useEffect(() => {
    setVisibility(nav ? "" : "hidden");
  }, [nav]);

  const linkValues = [
    { value: t("Home"), path: "/" },
    { value: t("Services"), path: "/Services" },
    { value: t("Get_in_Touch"), path: "/About" },
    { value: t("Tech_Insights"), path: "/TechInsight" },
    { value: t("Job_Openings"), path: "/Careers" },
  ];
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };
  const user = useSelector(selectUser);

  return (
    <div
      className={`${visibility} w-8/12 flex mx-auto flex-col font-medium p-4  mt-4 border border-gray-200 rounded-lg bg-blue-50   dark:bg-gray-800  dark:border-blue50 justify-center items-center  xl:hidden  `}
    >
      {/* {linkValues.map((link, index) => (
        <SingleNavLink
          key={index}
          value={link.value}
          path={link.path}
          style="leading-10 text-lg"
        />
      ))} */}
      <ShowOnLogout>
        {linkValues.map((link, index) => (
          <SingleNavLink key={index} value={link.value} path={link.path} />
        ))}
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
          <SingleNavLink value="Subscribers" path="/subscribers" />
          <SingleNavLink value="Submissions" path="/forms" />
          <SingleNavLink value="Manage Jobs" path="/ManageJobs" />
          <SingleNavLink value="Manage Articles" path="/ManageArticles" />
        </AdminLink>
        <AuthorLink>
          <SingleNavLink value="Profile" path="/profile" />
          <SingleNavLink value="My Articles" path="/editorArticles" />
          <SingleNavLink value="My Job offers" path="/editorJobs" />
        </AuthorLink>
      </ShowOnLogin>

      <ShowOnLogin>
        <Button
          visibility="block  px-8 py-2 mt-2"
          value="Logout"
          onClick={logoutUser}
        />
      </ShowOnLogin>
      <ShowOnLogout>
        <Link to="/login">
          <Button visibility="block  px-8 py-2 mt-2" value={t("signUp")} />
        </Link>
      </ShowOnLogout>
    </div>
  );
};

export default MobileNavbar;
