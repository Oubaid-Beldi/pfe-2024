import axios from "axios";

import { API_URL } from "../auth/authServices";
// Send automated email
const sendAutomatedEmail = async (emailData) => {
  const resp = await axios.post(`${API_URL}/sendAutomatedEmail`, emailData);
  return resp.data.message;
};
export const emailService = {
  sendAutomatedEmail,
};
