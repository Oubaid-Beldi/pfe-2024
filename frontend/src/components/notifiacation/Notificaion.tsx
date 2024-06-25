import { IoIosNotifications } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/sotre";
import {
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";

const Notification = () => {
  const dispatch: AppDispatch = useDispatch();
  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET());
  };
  return (
    <div
      className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <IoIosNotifications color="blue" size={32} />
        </div>
        <div>
          <p className="font-bold">Message:</p>
          <p>To verify your account, check your email for verification link.</p>
          <p
            className="font-bold hover:cursor-pointer hover:underline"
            onClick={sendVerEmail}
          >
            Resend Link
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
