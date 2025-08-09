import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./styles/CustomCarousel.css";

const CustomCarousel = ({ guides, viewprofilehandle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + guides.length) % guides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % guides.length);
  };
  return (
    <div className="carousel-container">
      <button
        onClick={prevSlide}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 backdrop-blur-md shadow-lg p-3 rounded-full transition-all duration-300 ${"bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40"}`}
      >
        <ChevronLeft className={`w-6 h-6 ${"text-white"}`} />
      </button>

      <div className="carousel-track">
        {guides.map((guide, index) => {
          let position = "hidden";
          if (index === currentIndex) position = "center";
          else if (index === (currentIndex + 1) % guides.length)
            position = "right";
          else if (index === (currentIndex - 1 + guides.length) % guides.length)
            position = "left";

          return (
            <div
              key={index}
              className={`${position} w-[280px] sm:w-[300px] h-[400px] flex items-center justify-center text-center flex-col hover:-translate-y-[10px] backdrop-blur-md rounded-2xl p-6 bg-white/10 border border-white/20 hover:border-white/40 ${
                position == "center" ? "scale-100" : "scale-90 opacity-80"
              } card`}
            >
              <div className="card-image">
                <img src={guide.image} alt={guide.name} />
              </div>
              <div className="card-info">
                <h3>{guide.name}</h3>
                <p className="expertise">{guide.expertise}</p>
                <p className="bio">{guide.bio}</p>
                <button
                  className="view-btn"
                  onClick={() => viewprofilehandle(guide)}
                >
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={nextSlide}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 backdrop-blur-md shadow-lg p-3 rounded-full transition-all duration-300 ${"bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40"}`}
      >
        <ChevronRight className={`w-6 h-6 ${"text-white"}`} />
      </button>
    </div>
  );
};

export default CustomCarousel;
