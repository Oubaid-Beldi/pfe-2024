import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import { Loader } from "../components/loader/Loader";

const useRedirectOnlyAdmins = (path: string) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(true);
      // Set loading state to true if user data is not yet available
      console.log(user);
      return; // Exit early if user data is not available yet
    }
    if (user) {
      console.log("found user");
      console.log(user);
    }

    const redirectLoggedOutUser = async () => {
      if (user?.role !== "Admin") {
        toast.info("This is a private admin interface");
        navigate(path);
      }
      setIsLoading(false); // Set loading state to false after redirection logic
    };

    redirectLoggedOutUser();
  }, [path, navigate, user]);

  // Render Loader component if loading state is true
  if (isLoading) {
    console.log("i am the loader");
    return <Loader />;
  }
};

export default useRedirectOnlyAdmins;
