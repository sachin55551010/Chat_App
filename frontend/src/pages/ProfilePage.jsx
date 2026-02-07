import { LuUserRound } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../redux/authApi";
import { setIsPreview } from "../redux/authSlice";
import { ProfilePicPreview } from "../components/ProfilePicPreview";
export const ProfilePage = () => {
  const { isPreviewImg } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [selectedImg, setSelectedImg] = useState(null);
  const { authUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const user_name = authUser?.updatedUser?.fullName || authUser?.user?.fullName;
  const user_email = authUser?.updatedUser?.email || authUser?.user?.email;
  const user_profile_pic = authUser?.user?.profilePic;
  const createdDate =
    authUser?.updatedUser?.createdAt || authUser?.user?.createdAt;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleImgBtn = () => {
    dispatch(setIsPreview(true));
  };
  return (
    <div className="">
      <div
        className={`relative pt-[var(--nav-h)] h-dvh flex justify-center px-2 ${
          isPreviewImg ? "blur-sm opacity-15" : ""
        } transition-all duration-200`}
      >
        <div className="h-fit mt-2 w-full md:w-1/2">
          <section className="flex flex-col items-center border-2 p-2 rounded-md gap-3">
            <h1 className="font-bold text-2xl">Profile</h1>
            <p>Your profile information</p>
            <div className="border-2 h-20 w-20 rounded-full relative">
              <img
                onClick={handleImgBtn}
                src={selectedImg || user_profile_pic || "avatar.jpg"}
                alt=""
                className={`object-fill h-full w-full rounded-full  ${
                  isLoading &&
                  "cursor-not-allowed pointer-events-none opacity-10"
                }`}
                accept="image/*"
              />
              <label htmlFor="pic">
                <div className="bg-red-400 w-fit p-[.35rem] rounded-full absolute top-[60%] right-[-10%]">
                  <IoCameraOutline className=" size-5 rounded-full cursor-pointer" />
                </div>

                <input
                  onChange={handleImageUpload}
                  id="pic"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
            {isLoading ? (
              <p>Profile picture is updating...</p>
            ) : (
              <p>Click the camera button to update your photo</p>
            )}

            <div className="w-full mt-2">
              <div className="flex gap-1 items-center">
                <LuUserRound />
                <h1 className="font-bold">Full Name</h1>
              </div>

              <p className="border p-1 rounded-lg">{user_name}</p>
            </div>
            <div className="w-full mt-2">
              <div className="flex gap-1 items-center">
                <MdOutlineEmail />
                <h1 className="font-bold">Email</h1>
              </div>
              <p className="border p-1 rounded-lg">{user_email}</p>
            </div>
          </section>
          <section className="flex flex-col border-2 p-2 mt-4 rounded-md gap-3">
            <h1 className="font-bold">Account information</h1>
            <div className="flex w-full justify-between border-b-1 py-1">
              <h4 className="font-semibold text-sm">Member since</h4>
              <span className="text-sm">{createdDate.slice(0, 10)}</span>
            </div>
            <div className="flex w-full justify-between mt-1">
              <h4 className="font-semibold text-sm">Active status</h4>
              <span className="font-semibold text-sm text-green-400">
                Online
              </span>
            </div>
          </section>
        </div>
      </div>
      {isPreviewImg && <ProfilePicPreview />}
    </div>
  );
};
