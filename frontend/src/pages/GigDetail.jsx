import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigById } from "../store/slices/gigSlice";
import { createOrder } from "../store/slices/orderSlice";
import Footer from "../components/Footer";

const GigDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentGig } = useSelector((state) => state.gig);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [requirements, setRequirements] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    dispatch(fetchGigById(id));
  }, [dispatch, id]);

  const handleOrder = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    await dispatch(createOrder({ gigId: id, requirements }));
    setShowOrderModal(false);
    navigate("/orders");
  };

  if (!currentGig) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading gig...
      </div>
    );
  }

  const isSeller = user?._id === currentGig.seller._id;

  const categoryIcon = {
    "graphics-design": "🎨",
    "programming-tech": "💻",
    "writing-translation": "✍️",
    "video-animation": "🎬",
    "digital-marketing": "📊",
    other: "⭐",
  }[currentGig.category];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

      {/* CONTENT */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div>
            <div className="h-96 rounded-2xl bg-gradient-to-br from-yellow-400/30 to-pink-500/30 flex items-center justify-center text-8xl">
              {categoryIcon}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3">
                About This Gig
              </h2>
              <p className="text-gray-300 whitespace-pre-wrap">
                {currentGig.description}
              </p>
            </div>

            {/* TAGS */}
            {currentGig.tags?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentGig.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-6">
              {currentGig.title}
            </h1>

            {/* SELLER */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/20">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 flex items-center justify-center text-xl font-bold text-gray-900">
                {currentGig.seller.username[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold">
                  {currentGig.seller.username}
                </p>
                <p className="text-sm text-gray-400">
                  {currentGig.seller.email}
                </p>
              </div>
            </div>

            {/* PRICING */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold text-yellow-400">
                  ${currentGig.price}
                </span>
                <span className="text-gray-300">
                  🕒 {currentGig.deliveryTime} day delivery
                </span>
              </div>

              {!isSeller ? (
                <button
                  onClick={() => setShowOrderModal(true)}
                  className="w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-[1.02] transition"
                >
                  Continue ({currentGig.price}$)
                </button>
              ) : (
                <div className="text-center text-gray-400 py-3">
                  This is your gig
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />

      {/* ORDER MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 px-4">
          <div className="bg-[#1f1b3a] rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Order Details
            </h2>

            <label className="block text-sm text-gray-300 mb-2">
              Requirements (optional)
            </label>
            <textarea
              rows="4"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Describe your requirements..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
            />

            <div className="bg-white/10 rounded-xl p-4 mb-4 text-gray-300">
              <div className="flex justify-between mb-2">
                <span>Price</span>
                <span className="font-bold">${currentGig.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{currentGig.deliveryTime} days</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowOrderModal(false)}
                className="flex-1 py-2 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleOrder}
                className="flex-1 py-2 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-pink-500"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GigDetail;
