import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, clearError } from "../store/slices/authSlice";
import Footer from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });

  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) navigate("/gigs");
    return () => dispatch(clearError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (formData.password !== formData.confirmPassword) {
      return setValidationError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setValidationError("Password must be at least 6 characters");
    }

    const { confirmPassword, ...registerData } = formData;
    dispatch(register(registerData));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

      {/* FORM CONTAINER */}
      <div className="flex-grow flex items-center justify-center px-4 py-16 pt-36">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">
              Create Account 🚀
            </h2>
            <p className="text-gray-300 mt-2">
              Join <span className="font-semibold">GigFlow</span> and start today
            </p>
          </div>

          {/* ERROR */}
          {(error || validationError) && (
            <div className="mb-5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 text-sm">
              {error || validationError}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* USERNAME */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="yourname"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="you@example.com"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                I want to
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option className="text-black" value="buyer">
                  Buy services
                </option>
                <option className="text-black" value="seller">
                  Sell services
                </option>
                <option className="text-black" value="both">
                  Buy & Sell services
                </option>
              </select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="••••••••"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="••••••••"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* FOOTER LINK */}
          <p className="text-center text-sm text-gray-300 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-yellow-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Register;
