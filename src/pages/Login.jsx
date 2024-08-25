import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../API/Auth/APiAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

// src/components/Login.js
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const handleOnSubmit = async (data) => {
    dispatch(login(data.email, data.password, navigate));
  };

  return (
    <div className="flex bg-[#ffffff] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#09090b]">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-[#18181b]">
            Or{" "}
            <a
              className="font-medium text-[#18181b] hover:text-[#18181b]/80"
              href="#"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label className="block text-sm font-medium text-[#6e6e77]">
              Email address
            </label>
            <div className="mt-1 relative">
              <input
                className="h-10 text-sm ring-offset-background border border-input text-[#6e6e77] px-3 py-2 placeholder-[#6e6e77] rounded-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm w-full pr-10"
                required
                type="text"
                id="email"
                name="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required to fill",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6e6e77]">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                className="h-10 text-sm ring-offset-background border border-input text-[#6e6e77] px-3 py-2 placeholder-[#6e6e77] rounded-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm w-full pr-10"
                required
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required to fill",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                className="font-medium text-[#18181b] hover:text-[#18181b]/90"
                to="/resetpassword"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              className="w-full h-10 flex items-center justify-center rounded-md bg-[#18181b] px-3 py-2 text-sm font-semibold text-[#fafafa] shadow-sm hover:bg-[#18181b]/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              type="submit"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
