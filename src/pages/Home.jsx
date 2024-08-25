import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import { courses, features, testimonials } from "../data/homeData";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1
            className="text-5xl md:text-6xl font-extrabold drop-shadow-lg"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Unlock Potential
          </h1>

          <p
            className="mt-6 text-lg md:text-xl drop-shadow-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Access Projects with AcademiaHub.
          </p>
          <div className="mt-8 flex space-x-4">
            <button
              onClick={toast.success("Sign in first")}
              className="px-8 py-4 font-bold text-richblack-900 bg-white rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-500"
            >
              GET STARTED
            </button>
            <button className="px-8 py-4 font-bold text-white bg-red-600 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-700">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>

      {/* Features part  */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
              Why Choose AcademiaHub
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Find The <span className="text-green-600">Best Features</span> Of
              AcademiaHub
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl md:text-4xl leading-8 font-extrabold tracking-tight text-gray-900">
              What Our <span className="text-green-600">Students</span> Say
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center"
              >
                <div className="mb-4">
                  <img
                    className="w-24 h-24 rounded-full mx-auto"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                </div>
                <p className="italic text-gray-700 mb-4">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
