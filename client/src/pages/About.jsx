import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Custom/Navbar";
import Footer from "../components/Custom/Footer";

function About() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Travel Booking",
      description:
        "Easily book flights, trains, buses, and more with our intuitive booking system.",
      icon: "✈️",
    },
    {
      title: "Vehicle Rentals",
      description:
        "Rent or hire vehicles tailored to your travel needs, from cars to bikes.",
      icon: "🚗",
    },
    {
      title: "Hotel Reservations",
      description:
        "Browse and book hotels based on your preferences and budget.",
      icon: "🏨",
    },
    {
      title: "Travel Guides",
      description:
        "Discover curated guides to plan your ideal trip with local insights.",
      icon: "📖",
    },
    {
      title: "Travel Packages",
      description:
        "Choose pre-designed packages or customize your own adventure.",
      icon: "🎒",
    },
    {
      title: "Responsive Design",
      description:
        "Enjoy a consistent experience across desktops, tablets, and mobile devices.",
      icon: "📱",
    },
  ];

  const techStack = [
    { name: "React.js", color: "bg-blue-500" },
    { name: "Tailwind CSS", color: "bg-cyan-500" },
    { name: "ShadCN UI", color: "bg-purple-500" },
    { name: "Vite", color: "bg-yellow-500" },
    { name: "Git & GitHub", color: "bg-gray-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            About <span className="text-pink-400">TravelGrid</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
            Your all-in-one travel platform designed to streamline your travel
            planning experience
          </p>
          <div className="w-24 h-1 bg-pink-400 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Our <span className="text-pink-400">Mission</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                TravelGrid is a comprehensive platform that simplifies travel
                planning. From booking flights, trains, or buses to renting
                vehicles, reserving hotels, or exploring expertly curated travel
                guides, TravelGrid offers a seamless and intuitive experience.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our mission is to make travel planning accessible, affordable,
                and enjoyable for everyone. Whether you're a solo traveler or
                planning a group adventure, TravelGrid simplifies every step of
                your journey.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  One Platform
                </h3>
                <p className="text-pink-100">
                  Everything you need for your perfect trip
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Why Choose <span className="text-pink-400">TravelGrid?</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-pink-400"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GSSoC Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Part of{" "}
            <span className="text-pink-400">
              GirlScript Summer of Code 2025
            </span>
          </h2>
          <div className="bg-gradient-to-r from-pink-900 to-purple-900 rounded-lg p-8 border border-pink-400">
            <p className="text-lg text-gray-200 mb-6 leading-relaxed">
              TravelGrid is proudly part of GirlScript Summer of Code 2025
              (GSSoC), providing contributors with an opportunity to collaborate
              on a real-world application, honing their skills and building a
              meaningful product.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold">
                Open Source
              </div>
              <div className="bg-purple-500 text-white px-6 py-2 rounded-full font-semibold">
                Community Driven
              </div>
              <div className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold">
                Learning Focused
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            Built with Modern <span className="text-pink-400">Technology</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`${tech.color} text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg`}
              >
                {tech.name}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 text-lg mb-6">
              We use cutting-edge technologies to ensure a fast, responsive, and
              modern user experience.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-pink-400 font-bold mb-2">Frontend</h4>
                <p className="text-gray-300 text-sm">
                  React.js with modern hooks and components
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-pink-400 font-bold mb-2">Styling</h4>
                <p className="text-gray-300 text-sm">
                  Tailwind CSS for responsive design
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="text-pink-400 font-bold mb-2">Development</h4>
                <p className="text-gray-300 text-sm">
                  Vite for fast build and development
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-pink-400">Journey?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of travelers who trust TravelGrid for their
            adventures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              Explore TravelGrid
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://github.com/Adarsh-Chaubey03/TravelGrid",
                  "_blank"
                )
              }
              className="border-2 border-pink-400 text-pink-400 px-8 py-3 rounded-lg font-semibold hover:bg-pink-400 hover:text-white transform hover:scale-105 transition-all duration-300"
            >
              View on GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
