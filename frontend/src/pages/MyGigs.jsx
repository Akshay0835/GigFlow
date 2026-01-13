import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyGigs, deleteGig } from "../store/slices/gigSlice";

const MyGigs = () => {
  const dispatch = useDispatch();
  const { myGigs } = useSelector((state) => state.gig);

  useEffect(() => {
    dispatch(fetchMyGigs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      dispatch(deleteGig(id));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              My Gigs 🎯
            </h1>
            <p className="text-gray-300 mt-1">
              Manage and track your services
            </p>
          </div>

          <Link
            to="/create-gig"
            className="inline-flex px-6 py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-105 transition"
          >
            + Create New Gig
          </Link>
        </div>

        {/* EMPTY STATE */}
        {myGigs.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-12 text-center">
            <p className="text-gray-300 mb-4">
              You haven’t created any gigs yet
            </p>
            <Link
              to="/create-gig"
              className="inline-block text-yellow-400 font-semibold hover:underline"
            >
              Create your first gig →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {myGigs.map((gig) => (
              <div
                key={gig._id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
              >
                {/* TOP */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {gig.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {gig.description}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      gig.status === "active"
                        ? "bg-green-400/20 text-green-300"
                        : "bg-gray-400/20 text-gray-300"
                    }`}
                  >
                    {gig.status}
                  </span>
                </div>

                {/* META */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                  <span>💰 ${gig.price}</span>
                  <span>📦 Orders: {gig.orders}</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-400/20 text-indigo-300 text-xs">
                    {gig.category}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                  <Link
                    to={`/gigs/${gig._id}`}
                    className="flex-1 text-center px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(gig._id)}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
