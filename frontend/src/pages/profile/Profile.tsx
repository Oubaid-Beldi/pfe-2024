import Card from "../../components/card/Card";
import { ChangeEvent, useEffect, useState } from "react";
// import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../hooks/userRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/sotre";
import {
  getUser,
  selectUser,
  updateUser,
} from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import { toast } from "react-toastify";
import Notificaion from "../../components/notifiacation/Notificaion";
import { MdOutlinePassword } from "react-icons/md";
import { Link } from "react-router-dom";
// const cloudName = "dervfgod6";
// const UPLOAD_PRESET = "ryynso91";

const cloud_Name = import.meta.env.VITE_REACT_APP_CLOUD_NAME;
const upload_Preset = import.meta.env.VITE_APP_UPLOAD_PRESET;
// const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
type Profile = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  photo: string;
  role: string;
  isVerified: boolean;
};
const Profile = () => {
  useRedirectLoggedOutUser("/");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("before the dispatch", user);
    dispatch(getUser());
    console.log("after the dispatch", user);
  }, [dispatch]);
  const { isLoading, user } = useSelector((state: RootState) => state.auth);
  const initProfile: Profile = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };

  const [profile, setProfile] = useState<Profile>(initProfile);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const fileType = e.target.files?.[0].type.split("/")[0];
      if (fileType !== "image") {
        toast.error("Only image files are allowed");
        return;
      }
      setProfileImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      // checking of the user uploaded an image
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_Name);
        image.append("upload_preset", upload_Preset);

        // Save image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dervfgod6/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();

        imageURL = imgData.url.toString();
      }
      // save profile to MongoDB
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };
      dispatch(updateUser(userData));
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        photo: user.photo || "",
        role: user.role || "",
        isVerified: user.isVerified || false,
      });
    }
  }, [user]);
  return (
    <>
      {isLoading && <Loader />}
      {!profile.isVerified && <Notificaion />}
      {/* <PageMenu /> */}

      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Welcome {profile?.name}{" "}
          </h2>
          <div className="flex justify-center items-center">
            <Card>
              {!isLoading && user && (
                <>
                  <div className="p-5">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4">
                        <img
                          className="w-24 h-24 rounded-full"
                          src={
                            imagePreview === null ? user?.photo : imagePreview
                          }
                          alt="Profile"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700">
                        Role: {profile?.role}
                      </h3>
                    </div>
                  </div>
                  <form className="p-5" onSubmit={saveProfile}>
                    <div className="mb-4">
                      <label
                        className="block text-lg font-medium text-gray-700"
                        htmlFor="photo"
                      >
                        Change photo
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 cursor-pointer focus:outline-none"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-lg font-medium text-gray-700"
                        htmlFor="name"
                      >
                        name
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-sm p-1 border border-gray-300 "
                        name="name"
                        type="text"
                        value={profile?.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-lg font-medium text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-sm p-1 border border-gray-300 "
                        name="email"
                        type="email"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-lg font-medium text-gray-700"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-sm p-1 border border-gray-300 "
                        name="phone"
                        type="text"
                        value={profile?.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-lg font-medium text-gray-700"
                        htmlFor="bio"
                      >
                        bio
                      </label>
                      <textarea
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-sm  border border-gray-300 "
                        cols={30}
                        rows={10}
                        name="bio"
                        value={profile?.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Link
                      to={"/changePassword"}
                      className="flex flex-row items-center justify-center "
                    >
                      <MdOutlinePassword
                        color="red"
                        size={26}
                        className="m-1"
                      />
                      <p className="m-1 underline">Change passowrd</p>
                    </Link>
                    <button className="bg-blue-500 text-white p-1 rounded-md w-full hover:bg-blue-800 mt-4">
                      Update Profile
                    </button>
                  </form>{" "}
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
const shortenTxt = (text: string | undefined, n: number) => {
  if (text && text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text || "";
};

export const UserName = () => {
  const user = useSelector(selectUser);
  const username = shortenTxt(user?.name, 7);
  return (
    <p className="text-blue-600">Hi, {username.toLocaleUpperCase() || "..."}</p>
  );
};

export default Profile;
