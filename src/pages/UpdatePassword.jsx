import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../API/Auth/APiAuth";

const UpdatePassword = () => {
  const [formdata, setFormdata] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showconfrmPassword, setShowconfrimPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { password, confirmPassword } = formdata;
  const location = useLocation();
  const handleOnchange = (e) => {
    setFormdata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex bg-[#ffffff] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-[#09090b]">
                Change your password
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleForm}>
              <div>
                <label className="block text-sm font-medium text-[#6e6e77]">
                  New Password
                </label>
                <div className="relative mt-1">
                  <input
                    className="h-10 text-sm ring-offset-background border border-input text-[#6e6e77] px-3 py-2 placeholder-[#6e6e77] rounded-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm w-full pr-10"
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnchange}
                    placeholder="New Password"
                  />
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
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    className="h-10 text-sm ring-offset-background border border-input text-[#6e6e77] px-3 py-2 placeholder-[#6e6e77] rounded-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm w-full pr-10"
                    id="confirmPassword"
                    required
                    type={showconfrmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnchange}
                    placeholder="Confirm Password"
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowconfrimPassword(!showconfrmPassword)}
                  >
                    {showconfrmPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="w-full h-10 flex items-center justify-center rounded-md bg-[#18181b] px-3 py-2 text-sm font-semibold text-[#fafafa] shadow-sm hover:bg-[#18181b]/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  type="submit"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
