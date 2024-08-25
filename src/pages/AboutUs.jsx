import Footer from "../components/common/Footer";

const AboutUs = () => {
  return (
    <div className="pt-12">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to AcademiaHub
        </h1>
      </header>

      {/* Who We Are Section */}
      <section className="m-16">
        <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">
          Who We Are
        </h2>
        <div className="p-8 mx-auto max-w-5xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3K8huGkfbWN-swcFVRBuosdLB5slvKMA43fD6fzLvMDjdeMrJ0NuYxufm7PJjzsQ-cKc&usqp=CAU"
              alt="Who We Are"
              className="w-[400px]"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-lg mb-6 text-gray-700">
              At AcademiaHub, we are dedicated to creating an online platform
              that streamlines the management and showcasing of student
              projects. Our goal is to empower students by providing a central
              hub for collaboration, progress tracking, and resource sharing.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              We are committed to transforming how students manage their ideas
              and projects, making it easier for them to bring their concepts to
              fruition.
            </p>
            <p className="text-lg text-gray-700">
              Our platform supports a dynamic and inclusive environment where
              students can collaborate, track their progress, and share
              resources effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-center">Our Vision</h2>
        <div className="p-8 mx-auto max-w-5xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <p className="text-lg mb-6">
              Our vision is to create a world where students have seamless
              access to a platform that supports the entire lifecycle of their
              projects—from inception to completion. We aim to use technology to
              facilitate collaboration, enhance project management, and provide
              valuable resources for students to thrive.
            </p>
            <p className="text-lg">
              We envision a future where every student has the tools and support
              needed to turn their ideas into reality, fostering innovation and
              growth across various fields.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQC7EYadwMtyQutINcWkXDCxei-WyE7XSwW_9NnXkwyFtz6Hh4PSXXTmsdJvQW2o5lOI&usqp=CAU"
              alt="Vision"
              className="w-[450px]"
            />
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="mb-16 bg-gray-50 py-12">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-5xl">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              Centralized Project Management
            </h3>
            <p className="text-gray-600">
              Our platform allows students to manage and track their projects
              from one central location, ensuring they have everything they need
              to succeed.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              Collaborative Tools
            </h3>
            <p className="text-gray-600">
              Connect with peers and mentors through built-in collaboration
              tools that facilitate sharing ideas, feedback, and resources.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              Resource Sharing
            </h3>
            <p className="text-gray-600">
              Access and share valuable resources and materials to enhance your
              projects and learning experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              Progress Tracking
            </h3>
            <p className="text-gray-600">
              Monitor your project progress with intuitive tracking tools that
              help you stay organized and focused.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              Flexible Access
            </h3>
            <p className="text-gray-600">
              Manage your projects and collaborate with others from any device,
              at any time, ensuring you have the flexibility you need.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              Continuous Improvement
            </h3>
            <p className="text-gray-600">
              We continuously update our platform based on user feedback to meet
              the evolving needs of students and project managers.
            </p>
          </div>
        </div>
      </section>

      {/* History of AcademiaHub Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
          History of AcademiaHub
        </h2>
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                2015: The Beginning
              </h3>
              <p className="text-gray-700">
                AcademiaHub was founded with the vision of providing a platform
                to streamline project management and collaboration for students.
                We started with basic project management features and a small
                selection of tools designed to support student projects.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                2017: Expansion
              </h3>
              <p className="text-gray-700">
                We expanded our platform's features to include advanced
                collaboration tools, resource sharing, and progress tracking to
                better support student projects.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                2020: Innovation and Technology
              </h3>
              <p className="text-gray-700">
                With technological advancements, AcademiaHub introduced new
                interactive features and integrations to enhance the project
                management experience for students.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                2023: Global Reach
              </h3>
              <p className="text-gray-700">
                We broadened our reach to a global audience, continually
                enhancing our platform to meet the diverse needs of students
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-16 bg-gray-50 py-12">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
          Why Choose AcademiaHub?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-5xl">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              Comprehensive Platform
            </h3>
            <p className="text-gray-600">
              Our platform offers a full suite of tools and features designed to
              meet all your project management and collaboration needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              User-Centric Design
            </h3>
            <p className="text-gray-600">
              We prioritize ease of use and intuitive design to ensure a smooth
              and enjoyable experience for all users.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-600">
              Dedicated Support
            </h3>
            <p className="text-gray-600">
              Our dedicated support team is here to assist you with any
              questions or issues, ensuring a seamless experience.
            </p>
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="text-center py-12 bg-gray-100">
        <blockquote className="text-xl italic text-gray-800">
          "The future belongs to those who believe in the beauty of their
          dreams." - Eleanor Roosevelt
        </blockquote>
        <p className="mt-4 text-gray-600">
          At AcademiaHub, we believe in empowering students to transform their
          dreams into reality through innovation, collaboration, and relentless
          pursuit of excellence.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
