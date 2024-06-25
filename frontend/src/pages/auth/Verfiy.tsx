import { useDispatch, useSelector } from "react-redux";
import { RESET, VerifyUser } from "../../redux/features/auth/authSlice";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";

const Verfiy = () => {
  const dispatch = useDispatch();

  const { verificationToken } = useParams();
  const verifyAccount = async () => {
    await dispatch(VerifyUser(verificationToken));
    await dispatch(RESET());
  };
  const { isLoading } = useSelector((state) => state.auth);
  return (
    <section className="text-center pt-10">
      {isLoading && <Loader />}
      <div className="">
        <h2 className="text-3xl text-cyan-500 ">Account Verifcation</h2>
        <p className="text-lg pt-5">
          To verfiy your account, click the button below...
        </p>
      </div>
      <button
        className="mt-4 p-1.5 text-white bg-blue-500 hover:bg-blue-800 rounded-md"
        onClick={verifyAccount}
      >
        Verfiy Account
      </button>
    </section>
  );
};
export default Verfiy;
