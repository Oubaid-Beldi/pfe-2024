import axios from "axios";
import {
  updatedProfile,
  userLoginData,
  userRegisterData,
} from "../../../types/types";

// Validate email
export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
const BACKEND_URL = "http://localhost:5000";
export const API_URL = `${BACKEND_URL}/api/users`;
// Register User
const register = async (userData: userRegisterData) => {
  const resp = await axios.post(`${API_URL}/register`, userData);
  return resp.data;
};
// Login User
const login = async (userData: userLoginData) => {
  const resp = await axios.post(`${API_URL}/login`, userData);
  return resp.data;
};
// Logout User
const logout = async () => {
  const resp = await axios.get(`${API_URL}/logout`);
  return resp.data.message;
};
// get login status
const getLoginStatus = async () => {
  const resp = await axios.get(`${API_URL}/loginStatus`);
  return resp.data;
};
// get User
const getUser = async () => {
  const resp = await axios.get(`${API_URL}/getUser`);
  return resp.data;
};
// Update User
const updateUser = async (userData: updatedProfile) => {
  const resp = await axios.patch(`${API_URL}/updateUser`, userData);
  return resp.data;
};
// Send Verfication Email
const sendVerificationEmail = async () => {
  const resp = await axios.post(`${API_URL}/sendVerificaitonEmail`);
  return resp.data.message;
};
// Verfiy a user by mail
const VerifyUser = async (verificationToken) => {
  const resp = await axios.patch(`${API_URL}/verifyUser/${verificationToken}`);
  return resp.data.message;
};
// Change password
const changePassword = async (userData) => {
  const resp = await axios.patch(`${API_URL}/changePassword`, userData);
  return resp.data.message;
};
// Forgot Password
const forgotPassword = async (email: string) => {
  const resp = await axios.post(`${API_URL}/forgotPassword`, { email });
  return resp.data.message;
};
// Reset Password
const resetPassword = async (userData, resetToken) => {
  const resp = await axios.patch(
    `${API_URL}/resetPassword/${resetToken}`,
    userData
  );
  return resp.data.message;
};
// get users
const getUsers = async () => {
  const resp = await axios.get(`${API_URL}/getUsers`);
  return resp.data;
};
// delete user
const deleteUser = async (id) => {
  const resp = await axios.delete(`${API_URL}/${id}`);
  return resp.data.message;
};
// upgrade user
const upgradeUser = async (userData) => {
  const resp = await axios.post(`${API_URL}/upgradeUser`, userData);
  return resp.data.message;
};
// Send Login code
const sendLoginCode = async (email) => {
  const resp = await axios.post(`${API_URL}/sendLoginCode/${email}`);
  return resp.data.message;
};
// Login with code
const loginWithCode = async (code, email) => {
  const resp = await axios.post(`${API_URL}/loginWithCode/${email}`, code);
  return resp.data;
};
// Login with google
const loginWithGoogle = async (userToken) => {
  const resp = await axios.post(`${API_URL}/google/callback`, userToken);
  return resp.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  VerifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
};
export default authService;
