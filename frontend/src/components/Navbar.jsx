import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"
            >
              GigFlow
            </Link>

            <div className="hidden md:flex gap-8">
              <Link
                to="/gigs"
                className="text-gray-300 hover:text-white transition"
              >
                Browse Gigs
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="hidden sm:block text-gray-300">
                  Hi, <span className="text-white font-medium">{user?.username}</span>
                </span>

                {(user?.role === "seller" || user?.role === "both") && (
                  <>
                    <Link
                      to="/create-gig"
                      className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-105 transition"
                    >
                      Create Gig
                    </Link>

                    <Link
                      to="/my-gigs"
                      className="text-gray-300 hover:text-white transition"
                    >
                      My Gigs
                    </Link>
                  </>
                )}

                <Link
                  to="/orders"
                  className="text-gray-300 hover:text-white transition"
                >
                  Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-105 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
