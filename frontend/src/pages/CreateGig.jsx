import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGig } from "../store/slices/gigSlice";

const CreateGig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "programming-tech",
    price: "",
    deliveryTime: "",
    tags: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gigData = {
      ...formData,
      price: Number(formData.price),
      deliveryTime: Number(formData.deliveryTime),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    await dispatch(createGig(gigData));
    navigate("/my-gigs");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white">
            Create a New Gig 🚀
          </h1>
          <p className="text-gray-300 mt-2">
            Showcase your skills and start earning on{" "}
            <span className="font-semibold">GigFlow</span>
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6"
        >
          {/* TITLE */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Gig Title *
            </label>
            <input
              type="text"
              required
              placeholder="I will build a modern React website"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="graphics-design">Graphics & Design</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="writing-translation">Writing & Translation</option>
              <option value="video-animation">Video & Animation</option>
              <option value="programming-tech">Programming & Tech</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              required
              rows="6"
              placeholder="Describe what you will deliver, tools you use, and what makes your gig special..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* PRICE & DELIVERY */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                min="5"
                required
                placeholder="50"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Delivery Time (days) *
              </label>
              <input
                type="number"
                min="1"
                required
                placeholder="3"
                value={formData.deliveryTime}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryTime: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* TAGS */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="react, website, frontend"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/my-gigs")}
              className="flex-1 py-3 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-[1.02] transition"
            >
              Create Gig
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGig;
