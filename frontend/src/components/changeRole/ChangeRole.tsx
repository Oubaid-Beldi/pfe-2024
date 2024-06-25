import { useState } from "react";

import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUsers, upgradeUser } from "../../redux/features/auth/authSlice";
import {
  EMAIL_RESET,
  sendAutomatedEmail,
} from "../../redux/features/email/emailSlice";

const ChangeRole = ({ _id, email }) => {
  const [userRole, setUserRole] = useState("");
  const dispatch = useDispatch();
  // Change User role
  const changeRole = async (e) => {
    e.preventDefault();
    console.log("change");
    if (!userRole) {
      toast.error("Please select a role");
      return;
    }

    const userData = {
      role: userRole,
      id: _id,
    };

    const emailData = {
      subject: "Account Role Changed - Onrtech",
      send_to: email,
      reply_to: "noreply@zino",
      template: "changeRole",
      url: "/login",
    };
    await dispatch(upgradeUser(userData));
    await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    dispatch(EMAIL_RESET());
  };
  return (
    <div>
      <form className="flex justify-center items-center" onSubmit={changeRole}>
        <select
          className="px-3 border border-gray-500"
          value={userRole}
          onChange={(e) => {
            setUserRole(e.target.value);
          }}
        >
          <option value="">--select--</option>
          <option value="User">User</option>
          <option value="Web Editor">Web Editor</option>
          <option value="Admin">Admin</option>
          {/* <option value="Suspended">Suspended</option> */}
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ml-1 px-2 rounded inline-flex items-center"
        >
          <FaCheck className="w-5 h-5 mr-2" />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;
