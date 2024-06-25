import { NavLink } from "react-router-dom";
type props = {
  value: string;
  path: string;
  style?: string;
};

const SingleNavLink = ({ value, path, style }: props) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `text-base hover:text-blue-400 mx-4 my-1.5 ${style} ${
          isActive ? "text-lg   transition-all duration-300" : " text-gray-600"
        } `
      }
    >
      {value}
    </NavLink>
  );
};

export default SingleNavLink;
