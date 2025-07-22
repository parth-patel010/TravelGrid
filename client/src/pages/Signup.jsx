import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Password validation function
  const validatePassword = (pwd) => {
    const lengthCheck = pwd.length >= 8;
    const numberCheck = /\d/.test(pwd);
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (!lengthCheck) {
      return "Password must be at least 8 characters.";
    }
    if (!numberCheck) {
      return "Password must include at least one number.";
    }
    if (!specialCharCheck) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can connect to API or backend here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };
  const handleGoogleLogin = () => {
    console.log("Google login clicked - integrate OAuth here.");
  };
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left: Background image only for large screens */}
      <div className="hidden lg:block lg:w-2/3 relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1695045038427-3acc1c0df23c?w=1600&auto=format&fit=crop&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/0 via-black/40 to-black"></div>
      </div>

      {/* Right: Login form on all screen sizes */}
      <div className="w-full h-screen lg:w-1/3 bg-black flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-pink-500 mb-6 text-center">
            Welcome
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Password Field */}
            <div className="mb-1">
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Password Error or Success */}
            {password && (
              <p
                className={`text-sm mt-1 ${
                  passwordError ? "text-red-500" : "text-green-500"
                }`}
              >
                {passwordError || "Password looks good!"}
              </p>
            )}
            <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <span className="text-sm font-medium text-gray-700">
              Login with Google
            </span>
          </button>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-300 disabled:opacity-50"
              disabled={!!passwordError}
            >
              Sign Up
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Have an account?{" "}
            <span
              className="text-pink-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
