import { NavLink } from "react-router-dom";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { useSignupMutation } from "../redux/authApi";
import { CgSpinner } from "react-icons/cg";
export const SignupPage = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isEyeOn, setIsEyeOn] = useState(false);
  //* form submit function
  const handleFormSubmit = (e) => {
    e.preventDefault();
    signup(signupData);

    setSignupData({
      fullName: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="min-h-dvh pt-[var(--nav-h)] flex flex-col items-center px-1">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-2 mt-10 w-full max-w-150"
      >
        <div className="flex items-center gap-2">
          <img className="h-7 w-7" src="chat logo.png" alt="" />
          <h1 className="font-bold text-xl">Lets Chat</h1>
        </div>

        <h1 className="font-bold text-2xl">Welcome to Lets Chat App!</h1>
        <p className="text-[.9rem]">
          To Start using app lets Create an Account
        </p>

        <div className="flex justify-around items-center mt-2 w-[100%]">
          <div className="h-[.12rem] w-[35%] rounded-full bg-gray-600"></div>
          <p className="text-[.8rem]">Enter details</p>
          <div className="h-[.12rem] w-[35%] rounded-full bg-gray-600"></div>
        </div>

        {/** creating input fields */}
        <div className="w-full p-2 flex flex-col gap-2">
          <label
            htmlFor="name"
            className="flex flex-col font-semibold gap-1 text-[.9rem]"
          >
            Your Name
            <input
              value={signupData.fullName}
              onChange={(e) =>
                setSignupData({ ...signupData, fullName: e.target.value })
              }
              id="name"
              type="text"
              placeholder="John Doe"
              className="border-1 border-gray-400 h-10 rounded-lg pl-3 font-medium outline-0"
            />
          </label>

          <label
            htmlFor="email"
            className="flex flex-col font-semibold gap-1 text-[.9rem]"
          >
            Your Email
            <input
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="border-1 border-gray-400 h-10 rounded-lg pl-3 font-medium outline-0"
            />
          </label>

          <label
            htmlFor="password"
            className="relative flex flex-col font-semibold gap-1 text-[.9rem]"
          >
            Your Name
            <input
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              id="password"
              type={isEyeOn ? "text" : "password"}
              placeholder="Enter Password"
              className="border-1 border-gray-400 h-10 rounded-lg pl-3 font-medium outline-0"
            />
            {isEyeOn ? (
              <IoIosEye
                onClick={() => setIsEyeOn(!isEyeOn)}
                className="absolute size-6 right-0 top-1/2 -translate-x-1/2 cursor-pointer"
              />
            ) : (
              <IoIosEyeOff
                onClick={() => setIsEyeOn(!isEyeOn)}
                className="absolute size-6 right-0 top-1/2 -translate-x-1/2 cursor-pointer"
              />
            )}
          </label>
          <button
            className={`bg-purple-500 rounded-lg py-2 mt-1 text-gray-200 font-semibold cursor-pointer flex items-center justify-center disabled:bg-purple-500/50 disabled:cursor-not-allowed`}
            disabled={isLoading}
          >
            {isLoading ? (
              <CgSpinner className="size-6 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <p className="text-gray-500 text-[.9rem]">
          Already have an account ?{" "}
          <NavLink to="/login" className="font-semibold underline">
            Login
          </NavLink>
        </p>
      </form>
      <h1 className="mt-4 font-extrabold">Created by Sachin</h1>
    </div>
  );
};
