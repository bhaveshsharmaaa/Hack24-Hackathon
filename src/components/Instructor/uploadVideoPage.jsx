import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosAdd,
  IoIosCreate,
  IoIosClose,
} from "react-icons/io";
import {
  deleteSection,
  createSection,
  updateSection,
} from "../../API/CourseApi/courseDetails";
import {
  createSubSection,
  deleteSubSection,
} from "../../API/CourseApi/courseDetails";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "../../Store/Slices/courseSlice";

const UploadVideoPage = () => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) => state.course.selectedCourse);
  const { token } = useSelector((state) => state.auth);
  const sections = selectedCourse?.courseContent || [];
  const [expandedSection, setExpandedSection] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const handleAddSection = async () => {
    if (!selectedCourse?._id) {
      console.error("Selected course is not available.");
      return;
    }

    try {
      const newSection = await createSection(
        {
          sectionName: `Name ${sections.length + 1}`,
          courseId: selectedCourse._id,
        },
        token
      );

      if (newSection) {
        const updatedCourseContent = [
          ...sections,
          newSection.courseContent.at(-1) || {}, // Add fallback to empty object
        ];

        dispatch(
          setSelectedCourse({
            ...selectedCourse,
            courseContent: updatedCourseContent,
          })
        );
      }
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  const handleEditSection = async (sectionId, newName) => {
    if (!sectionId || !newName) return;

    try {
      const updatedSection = await updateSection(
        {
          sectionName: newName,
          sectionId: sectionId,
          courseId: selectedCourse._id,
        },
        token
      );

      if (updatedSection) {
        const updatedSections = sections.map((section) =>
          section._id === sectionId
            ? { ...section, sectionName: newName }
            : section
        );

        dispatch(
          setSelectedCourse({
            ...selectedCourse,
            courseContent: updatedSections,
          })
        );
        setEditingSection(null);
      }
    } catch (error) {
      console.error("Error editing section:", error);
    }
  };

  const handleRemoveSection = async (sectionId) => {
    if (!sectionId) return;

    try {
      const updatedCourse = await deleteSection(
        { sectionId: sectionId, courseId: selectedCourse?._id },
        token
      );

      if (updatedCourse) {
        const updatedSections = sections.filter(
          (section) => section._id !== sectionId
        );
        setExpandedSection(null);
        dispatch(
          setSelectedCourse({
            ...selectedCourse,
            courseContent: updatedSections,
          })
        );
      }
    } catch (error) {
      console.error("Error removing section:", error);
    }
  };

  const handleAddVideo = async (sectionId, data) => {
    if (!sectionId || !data) return;

    const { videoName, videoDescription, videoFile } = data;

    if (!videoFile || videoFile.length === 0) {
      console.error("No video file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      formData.append("title", videoName);
      formData.append("description", videoDescription);
      formData.append("videoFile", videoFile[0]);

      const newVideo = await createSubSection(formData, token);
      console.log("newVideo-> ", newVideo);
      if (newVideo) {
        const updatedSections = sections.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                subSection: [
                  ...(section.subSection || []), // Ensure subSection is initialized
                  newVideo.subSection.at(-1) || {}, // Handle case where subSection might be undefined
                ],
              }
            : section
        );

        console.log("updatedVideo-> ", updatedSections);

        dispatch(
          setSelectedCourse({
            ...selectedCourse,
            courseContent: updatedSections,
          })
        );
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const handleRemoveVideo = async (sectionId, videoId) => {
    if (!sectionId || !videoId) return;

    try {
      await deleteSubSection(
        {
          subSectionId: videoId,
          courseId: selectedCourse._id,
          sectionId: sectionId,
        },
        token
      );

      // Update UI directly
      const updatedSections = sections.map((section) =>
        section._id === sectionId
          ? {
              ...section,
              subSection: section.subSection.filter(
                (video) => video._id !== videoId
              ),
            }
          : section
      );

      dispatch(
        setSelectedCourse({
          ...selectedCourse,
          courseContent: updatedSections,
        })
      );
    } catch (error) {
      console.error("Error removing video:", error);
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    if (expandedSection !== sectionId) {
      setEditingSection(null);
    }
  };

  const startEditing = (sectionId, name) => {
    setEditingSection(sectionId);
    setSectionName(name);
    setExpandedSection(sectionId);
  };

  const onSubmit = async (data, sectionId) => {
    if (data.videoFile && data.videoFile.length > 0) {
      await handleAddVideo(sectionId, {
        videoName: data.videoName,
        videoDescription: data.videoDescription,
        videoFile: data.videoFile,
      });
      reset();
    } else {
      console.error("Video file is missing");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl p-8 bg-white">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Add Contributers Name
        </h1>
        {sections.map((section) => (
          <div key={section._id} className="mb-6">
            <div
              className="flex justify-between items-center p-4 cursor-pointer rounded-lg shadow"
              onClick={() => toggleSection(section._id)}
            >
              {expandedSection === section._id &&
              editingSection === section._id ? (
                <input
                  type="text"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  onBlur={() => handleEditSection(section._id, sectionName)}
                  className="text-xl font-semibold text-gray-700 bg-gray-200 border-0 focus:outline-none focus:ring-0"
                  autoFocus
                />
              ) : (
                <h2 className="text-xl font-semibold text-gray-700">
                  {section?.sectionName}
                </h2>
              )}
              <div className="flex items-center space-x-2">
                <IoIosCreate
                  className="text-gray-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(section._id, section.sectionName);
                  }}
                />
                <IoIosClose
                  className="text-gray-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSection(section._id);
                  }}
                />
                {expandedSection === section._id ? (
                  <IoIosArrowUp className="text-gray-700" />
                ) : (
                  <IoIosArrowDown className="text-gray-700" />
                )}
              </div>
            </div>

            {expandedSection === section._id && (
              <div className="p-4 border bg-white rounded-lg shadow-lg mt-2">
                <div className="flex flex-col space-y-4 mt-4">
                  <input
                    type="text"
                    placeholder="Contribution"
                    {...register("videoName", { required: true })}
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Description"
                    {...register("videoDescription")}
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="file"
                    accept="video/*"
                    {...register("videoFile", { required: true })}
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleSubmit((data) =>
                      onSubmit(data, section._id)
                    )}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Add Name
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={handleAddSection}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-2"
        >
          <IoIosAdd />
          <span>Add Section</span>
        </button>
      </div>
    </div>
  );
};

export default UploadVideoPage;
