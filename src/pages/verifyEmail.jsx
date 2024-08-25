import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../API/Auth/APiAuth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { loading, signUpData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signUpData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  const handleResend = () => {
    dispatch(sendOtp(signUpData.email));
  };

  // Define the style for input
  const inputStyle = {
    width: "2rem",
    height: "2rem",
    margin: "0 0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid rgba(0,0,0,0.3)",
    textAlign: "center", // Center text within the input
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-md xl:py-16 xl:px-7 p-6 bg-white rounded-lg shadow-md mx-4 md:mx-auto my-12">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold">Verify Your Email</h1>
            <p className="text-[#6e6e77]">
              Enter the 6-digit code we sent to verify your account.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-center">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  renderInput={(props) => (
                    <input {...props} style={inputStyle} />
                  )}
                />
              </div>
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#18181b] text-white h-10 px-4 py-2 w-full"
              type="submit"
            >
              Verify Email
            </button>
          </form>
          <div className="text-center mt-4">
            <button
              onClick={handleResend}
              className="text-sm text-blue-500 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
