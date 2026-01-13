import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-white/10 backdrop-blur">
            🚀 India’s Growing Freelance Marketplace
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Hire Top Freelancers for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              Any Digital Service
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Get quality work done faster. From design to development, find verified freelancers ready to work.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/gigs"
              className="px-8 py-3 rounded-xl bg-white text-gray-900 font-semibold text-lg hover:scale-105 transition"
            >
              Explore Gigs
            </Link>

            <Link
              to="/register"
              className="px-8 py-3 rounded-xl border border-white/30 backdrop-blur hover:bg-white/10 transition text-lg"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-gray-300 text-sm">Freelancers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">25K+</h3>
            <p className="text-gray-300 text-sm">Completed Jobs</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">4.9★</h3>
            <p className="text-gray-300 text-sm">Average Rating</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="text-gray-300 text-sm">Support</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-14">
          Popular Categories
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          {[
            {
              icon: "🎨",
              title: "Graphics & Design",
              desc: "Logos, branding, UI/UX and illustrations",
            },
            {
              icon: "💻",
              title: "Programming & Tech",
              desc: "Web apps, mobile apps, APIs & software",
            },
            {
              icon: "✍️",
              title: "Writing & Translation",
              desc: "SEO content, blogs & translations",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="group bg-white/10 backdrop-blur rounded-2xl p-8 hover:bg-white/20 transition cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                {cat.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
              <p className="text-gray-300">{cat.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-20">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-300 mb-8">
          Join thousands of freelancers and clients growing together.
        </p>
        <Link
          to="/register"
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 font-bold text-lg hover:scale-105 transition"
        >
          Join Now
        </Link>
      </section>
          <Footer />
    </div>

  );
};

export default Home;
