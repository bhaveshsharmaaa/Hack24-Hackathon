// src/ContactForm.js

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnection } from "../API/apiConnection";
import { contactusEndpoint } from "../API/api";
import toast from "react-hot-toast";
import countryCodes from "../utils/codeOfCountry.json";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCodes[74].code
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const submitContactForm = async (data) => {
    console.log("Data", data);
    try {
      setLoading(true);
      await apiConnection("POST", contactusEndpoint.CONTACT_US_API, data);
      setLoading(false);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.log("Error in submitting contact form", error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleCountryCodeChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };

  return (
    <div
      className="bg-white text-black max-w-2xl mx-auto p-6 sm:p-8"
      data-v0-t="card"
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">
          Contact Us
        </h3>
        <p className="text-sm text-black">
          Fill out the form below and we will get back to you as soon as
          possible.
        </p>
      </div>
      <div className="p-6">
        <form
          onSubmit={handleSubmit(submitContactForm)}
          className="grid grid-cols-1 gap-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                First Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-sm ring-offset-pure-greys-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  First name is required
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Last Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-sm ring-offset-pure-greys-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  Last name is required
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-sm ring-offset-pure-greys-400 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="phoneNo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Phone Number
              </label>
              <div className="flex">
                <select
                  className="w-20 rounded-l-md border border-gray-400 bg-white py-2 text-sm ring-offset-pure-greys-400"
                  value={selectedCountryCode}
                  onChange={handleCountryCodeChange}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </option>
                  ))}
                </select>
                <input
                  className="flex-grow ml-2 rounded-md border border-gray-400 bg-white px-3 py-2 text-sm ring-offset-pure-greys-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="Enter your phone number"
                  type="tel"
                  {...register("phoneNo", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number should be 10 digits long",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number should be 10 digits long",
                    },
                  })}
                />
              </div>
              {errors.phoneNo && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNo.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Message
            </label>
            <textarea
              className="flex w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-sm ring-offset-pure-greys-400 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
              id="message"
              name="message"
              placeholder="Enter your message"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="text-red-500 text-sm">Message is required</span>
            )}
          </div>
          <div className="items-center p-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-pure-greys-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-10 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
