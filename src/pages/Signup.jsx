import { useState } from "react";
import { sendOtp } from "../API/Auth/APiAuth";
import { setSignupdata } from "../Store/Slices/authSlice";
import { ACCOUNT_TYPE } from "../utils/contants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { CheckValidation } from "../utils/Validate";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const handleOnSubmit = (data) => {
    const { email, password } = data;
    const { email: emailError, password: passwordError } = CheckValidation(
      email,
      password
    );

    if (emailError) {
      setError("email", { type: "manual", message: emailError });
    }
    if (passwordError) {
      setError("password", {
        type: "manual",
        message: "Password: 8+ chars, A-Z, a-z, 0-9",
      });
    }

    if (emailError || passwordError) return;

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...data,
      accountType,
    };

    dispatch(setSignupdata(signupData));
    dispatch(sendOtp(data.email, navigate));

    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const tabData = [
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="mx-auto max-w-md mt-16 space-y-6 px-4 sm:px-6 md:px-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-[#6e6e77]">Enter your details to get started.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAccountType(tab.type)}
              className={`px-4 py-2 rounded ${
                accountType === tab.type
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Student
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              First Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm placeholder:text-[#6e6e77]"
              required
              type="text"
              name="firstName"
              id="firstName"
              placeholder="John"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Last Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm placeholder:text-[#6e6e77]"
              required
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Doe"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Email Address
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm placeholder:text-[#6e6e77]"
            required
            type="text"
            name="email"
            id="email"
            placeholder="john@example.com"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="">
            <label className="text-sm font-medium leading-none">Password</label>
            <div className="flex relative">
              <input
                className="flex h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm placeholder:text-[#6e6e77] pr-10"
                required
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center "
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="">
            <label className="text-sm font-medium leading-none">
              Confirm Password
            </label>
            <div className="flex relative">
              <input
                className=" h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm placeholder:text-[#6e6e77] pr-10"
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className=" inset-y-0 right-3 absolute  flex items-center "
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 bg-card text-white hover:bg-card/90 h-10 px-4 py-2 w-full"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
