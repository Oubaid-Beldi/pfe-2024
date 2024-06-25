import { FaUsers } from "react-icons/fa";
import InfoBox from "../InfoBox/InfoBox";
import { BiUserCheck, BiUserMinus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CALC_VERIFIED_USER } from "../../redux/features/auth/authSlice";
// Icons
const icon1 = <FaUsers size={40} color="white" />;
const icon2 = <BiUserCheck size={40} color="white" />;
const icon3 = <BiUserMinus size={40} color="white" />;

const UserStats = () => {
  const dispatch = useDispatch();
  const { users, verifiedUsers } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(CALC_VERIFIED_USER());
  }, [dispatch, users]);
  const unverifiedUsers = users.length - verifiedUsers;
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">User Stats</h3>
      <div className="flex flex-wrap items-center justify-center">
        <div className="w-80 h-20 m-4">
          <InfoBox
            icon={icon1}
            title="Total Users"
            count={users.length}
            bgColor="bg-violet-600"
          />
        </div>
        <div className="w-80 h-20 m-4">
          <InfoBox
            icon={icon2}
            title="Verified Users"
            count={verifiedUsers}
            bgColor="bg-green-600"
          />
        </div>
        <div className="w-80 h-20 m-4">
          <InfoBox
            icon={icon3}
            title="Unverified Users"
            count={unverifiedUsers}
            bgColor="bg-red-400"
          />
        </div>
      </div>
    </div>
  );
};

export default UserStats;
