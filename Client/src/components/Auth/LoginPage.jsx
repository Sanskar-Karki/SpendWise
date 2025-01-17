import { useState } from "react";
import { z } from "zod";
import { HiOutlineMail, HiLockClosed, HiUser } from "react-icons/hi";
import { motion } from 'framer-motion';

// Zod validation schema
const signUpSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Password confirmation must be at least 6 characters long"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationSchema = isSignUp ? signUpSchema : signInSchema;

    try {
      validationSchema.parse(formData); // Zod validation
      console.log("Form data is valid:", formData);
      setErrors({});
      // Show success feedback
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      }
    }
  };

  const handleToggleForm = (signUp) => {
    setIsSignUp(signUp);
    resetForm(); // Reset form when toggling between Sign Up and Sign In
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-100 to-slate-400 flex items-center justify-center p-4 relative">
      <div className="relative w-full max-w-md">
        <div className="w-1/2 mx-auto mb-5">
          <img src="../../../public/logo.png" alt="SpendWise" />
        </div>
        <div className="relative bg-white bg-opacity-20 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden">
          {/* Header with animated toggle */}
          <div className="p-2 relative mb-6">
            <div
              className={`absolute top-2 left-2 w-[calc(50%-1rem)] h-12 opacity-50 bg-gradient-to-r from-blue-900 to-purple-700 rounded-lg transition-all duration-500 ease-in-out transform
                ${isSignUp ? 'translate-x-[calc(100%+0.5rem)]' : 'translate-x-0'}`}
            />
            <div className="relative flex gap-2 z-20">
              <button
                onClick={() => handleToggleForm(false)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out transform
                  ${!isSignUp ? 'scale-105 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleToggleForm(true)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out transform
                  ${isSignUp ? 'scale-105 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form container with animation */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  <HiOutlineMail className="inline-block mr-2 text-lg text-gray-700" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg text-purple bg-gray-50 bg-opacity-70 backdrop-blur-md border transition-all duration-300 ease-in-out placeholder-slate-600 focus:text-purple-600
                    ${errors.email ? 'border-red-500 ' : 'border-gray-200'} focus:text-purple-600 focus:border-gray-100 focus:ring-4 focus:ring-purple-400 focus:outline-none`}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    <HiUser className="inline-block mr-2 text-lg text-gray-700" />
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg text-purple bg-gray-50 bg-opacity-70 backdrop-blur-md border transition-all duration-300 ease-in-out placeholder-slate-600 focus:text-purple-600
                      ${errors.username ? 'border-red-500' : 'border-gray-200'} focus:border-gray-100 focus:ring-4 focus:ring-purple-400 focus:outline-none`}
                    placeholder="Choose a username"
                    required
                  />
                  {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  <HiLockClosed className="inline-block mr-2 text-lg text-gray-700" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg text-purple bg-gray-50 bg-opacity-70 backdrop-blur-md border transition-all duration-300 ease-in-out placeholder-slate-600 focus:text-purple-600
                    ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-gray-100 focus:ring-4 focus:ring-purple-400 focus:outline-none`}
                  placeholder="Enter your password"
                  required
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg text-purple bg-gray-50 bg-opacity-70 backdrop-blur-md border transition-all duration-300 ease-in-out placeholder-slate-600 focus:text-purple-600
                      ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:border-gray-100 focus:ring-4 focus:ring-purple-400 focus:outline-none`}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r opacity-80 from-blue-900 to-purple-700 rounded-lg text-white font-medium transform transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
