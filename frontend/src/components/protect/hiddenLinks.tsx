import { ReactNode } from "react";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";

interface Props {
  children: ReactNode;
}

export const ShowOnLogin = ({ children }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowOnLogout = ({ children }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};
export const UserLink = ({ children }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  if (isLoggedIn && user?.role === "User") {
    return children;
  }

  return null;
};

export const AdminLink = ({ children }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  if (isLoggedIn && user?.role === "Admin") {
    return children;
  }

  return null;
};
export const AuthorLink = ({ children }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  if (isLoggedIn && user?.role === "Web Editor") {
    return children;
  }
  return null;
};
