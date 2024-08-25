import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import ProfileDropdown from "../profile/ProfileDropdown";
import { apiConnection } from "../../API/apiConnection";
import { categories } from "../../API/api";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [categoriesdata, setCategoriesdata] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sidebarRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCourseCreationPage = location.pathname === "/coursecreation";

  const fetchCategories = async () => {
    try {
      const result = await apiConnection("GET", categories.CATEGORIES_API);
      setCategoriesdata(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (isCourseCreationPage) {
    return null;
  }

  return (
    <nav
      className={`top-0 w-full transition-colors duration-300 ${
        isHomePage
          ? isScrolled
            ? "bg-richblue-700 top-0 fixed z-20 shadow-md"
            : "bg-transparent top-0 fixed z-20"
          : "bg-richblue-700 sticky z-20"
      }`}
    >
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="text-white">
          <Link to="/">
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              AcademiaHub
            </h1>
          </Link>
        </div>
        <ul className="hidden space-x-6 lg:flex">
          {[
            { name: "HOME", path: "/" },
            { name: "ABOUT", path: "/about" },
            { name: "DASHBOARD", path: "/myprofile" },
            { name: "CONTACT", path: "/contact" },
          ].map(({ name, path }) => (
            <li
              key={name}
              className={`font-semibold transition-all duration-200 ease-in-out ${
                location.pathname === path
                  ? "text-green-400"
                  : "text-white hover:text-green-400"
              }`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center space-x-4 text-white">
          {token === null ? (
            <>
              <Link to="/login">
                <button
                  className={`font-semibold transition-all duration-200 ease-in-out ${
                    location.pathname === "/login"
                      ? "text-green-400"
                      : "text-white hover:text-green-400"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className={`font-semibold transition-all duration-200 ease-in-out ${
                    location.pathname === "/signup"
                      ? "text-green-400"
                      : "text-white hover:text-green-400"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX className="text-white" size={24} />
            ) : (
              <FiMenu className="text-white" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={sidebarRef}
        className={`fixed top-16 right-0 w-[80%] h-full max-w-[200px] bg-gray-900 bg-opacity-90 z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full relative">
          <nav className="flex flex-col mt-12 space-y-6 text-center">
            {[
              { name: "HOME", path: "/" },
              { name: "NEWS", path: "/news" },
              { name: "FEATURES", path: "/features" },
              { name: "COURSES", path: "/courses" },
              { name: "ABOUT", path: "/about" },
              { name: "DASHBOARD", path: "/myprofile" },
              { name: "OUR TEAM", path: "/ourteam" },
              { name: "CONTACT", path: "/contact" },
            ].map(({ name, path }) => (
              <Link
                key={name}
                className={`text-lg font-medium transition-all duration-200 ease-in-out ${
                  location.pathname === path
                    ? "text-green-400"
                    : "text-white hover:text-green-400"
                }`}
                to={path}
              >
                {name}
              </Link>
            ))}
            {token === null && (
              <Link to="/login">
                <button
                  className="text-lg font-medium transition-all duration-200 ease-in-out hover:text-green-400"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Login
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button
                  className="text-lg font-medium transition-all duration-200 ease-in-out hover:text-green-400"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Sign Up
                </button>
              </Link>
            )}
            <div className="flex flex-col items-center space-y-5">
              {user && user.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className="relative">
                  <IoCartOutline size={24} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token !== null && <ProfileDropdown />}
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
