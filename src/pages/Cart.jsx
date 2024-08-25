import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { removeFromCart } from "../Store/Slices/cartSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  if (!token || user.accountType !== "student") {
    navigate("/");
  }
  const cartCourses = useSelector((state) => state.cart.courses);
  const totalItems = useSelector((state) => state.cart.totalItems);

  const dispatch = useDispatch();

  const totalBudget = cartCourses.reduce(
    (total, course) => total + course.price,
    0
  );

  const handleRemove = (courseId) => {
    dispatch(removeFromCart(courseId));
  };

  return (
    <motion.section
      className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartCourses.map((course) => (
                <motion.div
                  key={course.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img
                        className="h-20 w-20 dark:hidden"
                        src={course.thumbnail}
                        alt={course.name}
                      />
                      <img
                        className="hidden h-20 w-20 dark:block"
                        src={course.thumbnail}
                        alt={course.name}
                      />
                    </a>

                    <div className="flex-1 md:order-2">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                      >
                        {course.name}
                      </a>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Instructor: {course.instructor}
                      </p>
                      <div className="flex items-center">
                        <span className="text-sm text-yellow-400 mr-1">
                          {course.rating}
                        </span>
                        <div className="flex items-center">
                          {[...Array(course.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-4 w-4 text-yellow-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.043 3.216a1 1 0 00.95.69h3.367c.969 0 1.372 1.24.588 1.81l-2.72 1.97a1 1 0 00-.364 1.118l1.043 3.216c.3.921-.755 1.688-1.54 1.118l-2.72-1.97a1 1 0 00-1.175 0l-2.72 1.97c-.784.57-1.838-.197-1.54-1.118l1.043-3.216a1 1 0 00-.364-1.118L2.005 8.643c-.784-.57-.381-1.81.588-1.81h3.367a1 1 0 00.95-.69l1.043-3.216z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center md:order-3">
                      <div className="text-end md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          ${course.price}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(course.id)}
                        className="ml-4 inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        <svg
                          className="mr-1.5 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ${totalBudget.toFixed(2)}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total Courses
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {totalItems}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      ${totalBudget.toFixed(2)}
                    </dd>
                  </dl>
                </div>

                <button className="w-full rounded-md bg-blue-600 px-6 py-3 text-center text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </motion.section>
  );
};

export default Cart;
