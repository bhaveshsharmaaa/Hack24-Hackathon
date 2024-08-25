import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  addCourse,
  fetchCourseCategories,
  updateCourseData,
} from "../../API/CourseApi/courseDetails";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import UploadVideoPage from "./uploadVideoPage";
import { setSelectedCourse } from "../../Store/Slices/courseSlice";
import toast from "react-hot-toast";

const CourseCreationPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [courseCategoryData, setCategoriesData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { selectedCourse } = useSelector((state) => state.course);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCourseCategories();
        if (categories.length > 0) {
          setCategoriesData(categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (currentStep === 1) {
      setValue("courseTitle", watch("courseTitle"));
      setValue("courseDescription", watch("courseDescription"));
    } else if (currentStep === 2) {
      setValue("coursePrice", watch("coursePrice"));
      setValue("courseCategory", watch("courseCategory"));
    } else if (currentStep === 3) {
      setTags(watch("tags") || []);
      setThumbnail(
        watch("thumbnail") ? URL.createObjectURL(watch("thumbnail")) : null
      );
    } else if (currentStep === 4) {
      setValue("benefits", watch("benefits"));
      setValue("instructions", watch("instructions"));
    }
  }, [currentStep, watch, setValue]);

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    setValue("tags", newTags);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setThumbnail(URL.createObjectURL(file));
        setValue("thumbnail", file);
      } else {
        toast.error("Please select an image file.");
      }
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setValue("thumbnail", null);
  };

  const onSubmit = async (data) => {
    console.log("data-> ", data);
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("tag", JSON.stringify(tags));
    if (data.thumbnail) {
      formData.append("thumbnailImage", data.thumbnail);
    }
    formData.append("whatYouWillLearn", data.benefits);
    formData.append("instructions", data.instructions || "");

    console.log("FormData:", [...formData.entries()]);

    try {
      const result = await addCourse(formData, token);
      dispatch(setSelectedCourse(result));
      setCurrentStep(5);
      console.log("Course created successfully:", result);
      // navigate("/myvideo");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Project title</label>
              <input
                type="text"
                placeholder="Give it a name"
                {...register("courseTitle", {
                  required: "Course title is required",
                })}
                className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.courseTitle ? "border-red-500" : ""
                }`}
              />
              {errors.courseTitle && (
                <span className="text-red-500 text-sm">
                  {errors.courseTitle.message}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">
                Describe your Project
              </label>
              <textarea
                placeholder="Write a thorough description of what your course will contain."
                {...register("courseDescription", {
                  required: "Course description is required",
                })}
                className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.courseDescription ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.courseDescription && (
                <span className="text-red-500 text-sm">
                  {errors.courseDescription.message}
                </span>
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Project Budget</label>
              <input
                type="number"
                placeholder="Enter the price"
                {...register("coursePrice", {
                  required: "Course price is required",
                })}
                className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.coursePrice ? "border-red-500" : ""
                }`}
              />
              {errors.coursePrice && (
                <span className="text-red-500 text-sm">
                  {errors.coursePrice.message}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Project Category</label>
              <select
                {...register("courseCategory", {
                  required: "Course category is required",
                })}
                className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.courseCategory ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a category</option>
                {courseCategoryData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.courseCategory && (
                <span className="text-red-500 text-sm">
                  {errors.courseCategory.message}
                </span>
              )}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Tags</label>
              <input
                type="text"
                placeholder="Add a tag and press enter"
                onKeyDown={handleAddTag}
                value={tagInput}
                onChange={handleTagInputChange}
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-2 flex flex-wrap">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-red-500"
                      onClick={() => handleRemoveTag(index)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Thumbnail</label>
              <div className="flex flex-col items-center mt-2">
                {!thumbnail && (
                  <label className="cursor-pointer border border-dashed border-gray-300 p-4 rounded-lg w-full text-center hover:bg-gray-50">
                    <span className="block text-gray-500">
                      Upload Thumbnail
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </label>
                )}
                {thumbnail && (
                  <div className="relative mt-4 w-full max-w-xs">
                    <img
                      src={thumbnail}
                      alt="Thumbnail"
                      className="w-full h-auto rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                      onClick={handleRemoveThumbnail}
                    >
                      <FiX className="text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">
                Benefits of the Project
              </label>
              <textarea
                placeholder="List the benefits of taking this course."
                {...register("benefits", {
                  required: "Course benefits are required",
                })}
                className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.benefits ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.benefits && (
                <span className="text-red-500 text-sm">
                  {errors.benefits.message}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">
                Instructions of your projects
              </label>
              <textarea
                placeholder="Add any additional instructions."
                {...register("instructions", {
                  required: "Course benefits are required",
                })}
                className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.benefits ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.instructions && (
                <span className="text-red-500 text-sm">
                  {errors.instructions.message}
                </span>
              )}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <UploadVideoPage />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const publish = () => {
    navigate("/myprofile");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white border-b shadow-md w-full px-10 p-4 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-500">{`${currentStep}/5`}</span>
        <button
          className="text-gray-500"
          onClick={() => navigate("/myprofile")}
        >
          <RxCross1 className="text-black" />
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Tell us about your Project
          </h2>
          <p className="text-center text-gray-500 mb-6">
            We'll use this information to customize your Project. You can change
            it any time.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </form>
        </div>
      </div>
      <div className="bg-white border-t px-10 shadow-md w-full p-4 flex justify-between">
        <button
          className="text-gray-500"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          ← Back
        </button>
        {currentStep < 5 ? (
          currentStep < 4 ? (
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={handleNext}
            >
              Continue
            </button>
          ) : (
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-md"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          )
        ) : (
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-md"
            onClick={publish}
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCreationPage;
