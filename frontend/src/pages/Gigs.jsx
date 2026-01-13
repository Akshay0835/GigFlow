import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGigs } from "../store/slices/gigSlice";
import Footer from "../components/Footer";

const Gigs = () => {
  const dispatch = useDispatch();
  const { gigs, isLoading } = useSelector((state) => state.gig);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "newest",
  });

  useEffect(() => {
    dispatch(fetchGigs(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const categoryIcon = (cat) => {
    switch (cat) {
      case "graphics-design":
        return "🎨";
      case "programming-tech":
        return "💻";
      case "writing-translation":
        return "✍️";
      case "video-animation":
        return "🎬";
      case "digital-marketing":
        return "📊";
      default:
        return "⭐";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

      {/* CONTENT */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white">
            Browse Gigs
          </h1>
          <p className="text-gray-300 mt-2">
            Find the perfect service for your business
          </p>
        </div>

        {/* FILTERS */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
          <input
            type="text"
            placeholder="Search gigs..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option className="text-black" value="">
              All Categories
            </option>
            <option className="text-black" value="graphics-design">
              Graphics & Design
            </option>
            <option className="text-black" value="digital-marketing">
              Digital Marketing
            </option>
            <option className="text-black" value="writing-translation">
              Writing & Translation
            </option>
            <option className="text-black" value="video-animation">
              Video & Animation
            </option>
            <option className="text-black" value="programming-tech">
              Programming & Tech
            </option>
            <option className="text-black" value="other">
              Other
            </option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option className="text-black" value="newest">
              Newest
            </option>
            <option className="text-black" value="popular">
              Most Popular
            </option>
            <option className="text-black" value="price-asc">
              Price: Low to High
            </option>
            <option className="text-black" value="price-desc">
              Price: High to Low
            </option>
          </select>
        </div>

        {/* STATES */}
        {isLoading ? (
          <div className="text-center py-24 text-gray-300 text-lg">
            Loading gigs...
          </div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-24 text-gray-400 text-lg">
            No gigs found 😔
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gigs.map((gig) => (
              <Link
                key={gig._id}
                to={`/gigs/${gig._id}`}
                className="group bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition"
              >
                {/* IMAGE */}
                <div className="h-48 flex items-center justify-center text-6xl bg-gradient-to-br from-yellow-400/30 to-pink-500/30">
                  <span className="group-hover:scale-110 transition">
                    {categoryIcon(gig.category)}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-5 text-white">
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {gig.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {gig.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">👤</span>
                      {gig.seller.username}
                    </div>
                    <span className="text-lg font-bold text-yellow-400">
                      ${gig.price}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-gray-400">
                    🕒 {gig.deliveryTime} day
                    {gig.deliveryTime > 1 ? "s" : ""} delivery
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Gigs;
