import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSave, FaArrowLeft, FaCamera, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import toast from "react-hot-toast";
import {
  updateUserProfileAdditonal,
  uploadProfilePicture,
  deleteUserAccount,
  changePassword,
} from "../API/ProfileAPI/ProfileAPi";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  if (!user) {
    navigate("/");
  }

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      gender: user?.additionalDetails?.gender || "",
      email: user?.email || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      about: user?.additionalDetails?.about || "",
    },
  });

  const handlePersonalDetails = async (data) => {
    console.log("data-> ", data);
    await updateUserProfileAdditonal(token, dispatch, data);
    if (selectedImage) {
      try {
        await uploadProfilePicture(token, selectedImage);
        console.log("Profile picture updated successfully");
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
    reset(data);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      toast.success("Please click on Save button for saving changes");
    }
  };

  const handleDeleteAccount = async () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to delete your account?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteUserAccount(token, dispatch, navigate);
            } catch (error) {
              console.error("Error deleting account:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => console.log("Account deletion cancelled"),
        },
      ],
    });
  };

  const { register: registerPassword, handleSubmit: handlePasswordSubmit } =
    useForm();

  const handleChangePassword = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }
      await changePassword(token, data);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Change Display Picture Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Change Display Picture
          </h2>
          <div className="flex items-center">
            <img
              src={previewImage || user?.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="profilePicture"
              className="ml-4 flex items-center text-blue-500 hover:underline cursor-pointer"
            >
              <FaCamera className="mr-2" /> Change Picture
            </label>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Details
          </h2>
          <form onSubmit={handleSubmit(handlePersonalDetails)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Form Fields */}
              <div className="p-4">
                <label className="block text-gray-700 mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("firstName")}
                />
              </div>
              <div className="p-4">
                <label className="block text-gray-700 mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("lastName")}
                />
              </div>
              <div className="p-4">
                <label className="block text-gray-700 mb-2" htmlFor="gender">
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("gender")}
                />
              </div>
              <div className="p-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("email")}
                />
              </div>
              <div className="p-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="contactNumber"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("contactNumber")}
                />
              </div>
              <div className="p-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full p-2 border border-gray-300 rounded"
                  {...register("dateOfBirth")}
                />
              </div>
              {/* New About Us Section */}
              <div className="p-4">
                <label className="block text-gray-700 mb-2" htmlFor="about">
                  About Us
                </label>
                <textarea
                  id="about"
                  name="about"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  {...register("about")}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-x-2"
              >
                <FaSave /> Save
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit(handleChangePassword)}>
            <div className="p-4">
              <label className="block text-gray-700 mb-2" htmlFor="oldPassword">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="w-full p-2 border border-gray-300 rounded"
                {...registerPassword("oldPassword", { required: true })}
              />
            </div>
            <div className="p-4">
              <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full p-2 border border-gray-300 rounded"
                {...registerPassword("newPassword", { required: true })}
              />
            </div>
            <div className="p-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded"
                {...registerPassword("confirmPassword", { required: true })}
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-x-2"
              >
                <FaSave /> Save
              </button>
            </div>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Delete Account
          </h2>
          <div className="flex justify-between">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-x-2"
            >
              <FaTrash /> Delete Account
            </button>
            <Link to="/myprofile">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-x-2"
              >
                <FaArrowLeft /> Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
