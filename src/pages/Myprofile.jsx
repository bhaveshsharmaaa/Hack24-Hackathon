import { FiGrid } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { LuLaptop } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const InstructorProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null; // Ensure the component returns null if no user
  }

  return (
    <div className="flex w-full bg-gray-100 min-h-screen">
      {user.accountType === "Student" && (
        <>
          {/* Sidebar for larger screens */}
          <aside className="fixed inset-y-0 top-16 left-0 z-10 hidden w-20 flex-col border-r bg-white shadow-lg sm:flex">
            <nav className="flex flex-col items-center gap-6 px-2 py-6">
              <Link
                to="/myprofile"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <RiAccountCircleLine size={30} />
                <span className="absolute left-14 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                  Student Profile
                </span>
              </Link>
              <Link
                to="/mycourses"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <IoBookOutline size={30} />
                <span className="absolute left-14 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                  My Projects
                </span>
              </Link>
              <Link
                to="/coursecreation"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <LuLaptop size={30} />
                <span className="absolute left-14 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                  Projects Creation
                </span>
              </Link>
              <Link
                to="/dashboardinstructor"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <FiGrid size={30} />
                <span className="absolute left-14 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300">
                  Dashboard
                </span>
              </Link>
            </nav>
          </aside>

          {/* Bottom navigation for mobile screens */}
          <aside className="fixed bottom-0 left-0 right-0 z-10 flex sm:hidden w-full border-t bg-white shadow-lg">
            <nav className="flex flex-row items-center justify-around w-full py-2">
              <Link
                to="/myprofile"
                className="group relative flex flex-col items-center justify-center text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <RiAccountCircleLine size={24} />
                <span className="text-xs">Profile</span>
              </Link>
              <Link
                to="/mycourses"
                className="group relative flex flex-col items-center justify-center text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <IoBookOutline size={24} />
                <span className="text-xs">Courses</span>
              </Link>
              <Link
                to="/coursecreation"
                className="group relative flex flex-col items-center justify-center text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <LuLaptop size={24} />
                <span className="text-xs">Create</span>
              </Link>
              <Link
                to="/dashboardinstructor"
                className="group relative flex flex-col items-center justify-center text-xl hover:bg-gray-100 transition-all duration-200"
              >
                <FiGrid size={24} />
                <span className="text-xs">Dashboard</span>
              </Link>
            </nav>
          </aside>
        </>
      )}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-20 w-full pb-20 sm:pb-4">
        {" "}
        {/* Added pb-20 for bottom padding */}
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 w-full">
          <div className="col-span-2 grid gap-6">
            <div className="rounded-lg border bg-white text-gray-800 shadow-md">
              <div className="space-y-4 flex flex-col items-center gap-4 bg-gray-50 p-6">
                <span className="relative flex shrink-0 overflow-hidden rounded-full h-28 w-28 border-4 border-white shadow-lg">
                  <img
                    className="aspect-square h-full w-full"
                    alt="Instructor Avatar"
                    src={user.image}
                  />
                </span>
                <div className="grid gap-1 text-center">
                  <div className="text-2xl font-bold">
                    {user.firstName} {user?.lastName}
                  </div>
                  <div className="text-sm text-gray-500">Instructor</div>
                </div>
              </div>
              <div className="grid gap-3 p-6">
                <div className="text-sm font-semibold text-gray-600">
                  About: {user.additionalDetails.about}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Gender: {user.additionalDetails.gender}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Phone: {user.additionalDetails.contactNumber}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Email: {user.email}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 bg-gray-50 p-4">
                <Link to="/editprofile">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black border border-gray-300 bg-white hover:bg-gray-200 h-10 px-4 py-2">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-white text-gray-800 shadow-md">
                <div className="flex flex-col space-y-1.5 bg-green-50 text-gray-800 p-4">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    My Projects
                  </h3>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold">12</div>
                  <div className="text-sm text-gray-500">Courses Created</div>
                </div>
                <div className="flex items-center justify-start p-4">
                  <Link
                    className="text-sm font-medium text-blue-600 hover:underline"
                    to="/mycourses"
                  >
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 w-full">
            <div className="rounded-lg border bg-white text-gray-800 shadow-md w-full">
              <div className="flex flex-col space-y-1.5 bg-gray-50 p-4">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  About
                </h3>
              </div>
              <div className="p-4">
                <div>{user.additionalDetails.about}</div>
              </div>
            </div>
            <div className="rounded-lg border bg-white text-gray-800 shadow-md w-full">
              <div className="flex flex-col space-y-1.5 bg-gray-50 p-4">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Contact
                </h3>
              </div>
              <div className="p-4">
                <div>
                  Phone: {user.additionalDetails.contactNumber}
                  <br /> Email: {user.email}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorProfile;
