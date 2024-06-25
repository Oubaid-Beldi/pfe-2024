// import { BrowserRouter, Route } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Layout from "./components/layout/Layout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";
// import Reset from "./pages/auth/Reset";
// import LoginWithCode from "./pages/auth/LoginWithCode";
// import Profile from "./pages/profile/Profile";
// import Verfiy from "./pages/auth/Verfiy";
// import ChangePassword from "./pages/changePassword/ChangePassword";
// import UserList from "./pages/UserList/UserList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "./Routes";
// import Loader from "./components/loader/Loader";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import { AppDispatch } from "./redux/sotre";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);
  return (
    <>
      <ToastContainer />
      {/* <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/resetPassword/:resetToken" element={<Reset />} />
          <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/verify/:verficationToke"
            element={
              <Layout>
                <Verfiy />
              </Layout>
            }
          />
          <Route
            path="/changePassword"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter> */}
      <Routes />
    </>
  );
};
export default App;
