import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Valer College Hall Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Valer College Hall</h2>
            <div className="h-1 w-12 bg-orange-500 mb-4"></div>
            <ul className="space-y-2">
              <li>8353 Sierra Avenue</li>
              <li>Frisco, CA 91335</li>
              <li>Phone: (907) 350-7400</li>
              <li>Monday – Thursday, 8:00 am – 6:00 pm</li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Useful Links</h2>
            <div className="h-1 w-12 bg-orange-500 mb-4"></div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-400">
                  Academics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Student Life
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Research
                </a>
              </li>
            </ul>
          </div>

          {/* Campus Today Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Campus Today</h2>
            <div className="h-1 w-12 bg-orange-500 mb-4"></div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-400">
                  Life & Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Housing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Dining
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Athletics & Recreation
                </a>
              </li>
            </ul>
          </div>

          {/* Research Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Research</h2>
            <div className="h-1 w-12 bg-orange-500 mb-4"></div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-400">
                  Academic Divisions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Student Research
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Centers & Institutes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400">
                  Research Facilities
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a
                href="#"
                aria-label="Facebook"
                className="text-white hover:text-orange-400"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-white hover:text-orange-400"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white hover:text-orange-400"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-white hover:text-orange-400"
              >
                <FaYoutube size={20} />
              </a>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-center md:text-left">
                &copy; 2020 - 2023 • AcademiaHub™ by Dannci
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
