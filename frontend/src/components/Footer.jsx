import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/30 backdrop-blur border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid gap-8 md:grid-cols-3 text-gray-300">
          
          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold text-white">GigFlow</h3>
            <p className="mt-3 text-sm text-gray-400">
              A modern freelance marketplace connecting clients with talented freelancers worldwide.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/gigs" className="hover:text-white transition">
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Support
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} GigFlow. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
