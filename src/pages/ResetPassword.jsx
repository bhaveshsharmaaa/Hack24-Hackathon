import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../API/Auth/APiAuth";

const ResetPassword = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setSentEmail));
  };
  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <h2 className="text-lg font-semibold text-[#09090b]">Loading...</h2>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-28 bg-[#ffffff] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <h1 className="text-3xl font-bold tracking-tight text-[#09090b] sm:text-4xl text-left">
              {sentEmail ? "Check your email" : "Reset Your Password"}
            </h1>
            <p className="mt-4 text-[#6e6e77] text-left">
              {sentEmail
                ? `We have sent an email to your ${email}. Please check your email to reset your password.`
                : "Enter your email address below and we will send you mail to reset your password."}
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {!sentEmail && (
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only">
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6e6e77] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="Enter your email"
                    required=""
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>
              )}
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-card text-white hover:bg-card/90 h-10 px-4 py-2 w-full"
                type="submit"
              >
                {!sentEmail ? "Reset Password" : "Resend Email"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
