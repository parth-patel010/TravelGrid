import React, { useEffect } from "react";
import hotel from "../../assets/hotel.jpg";
import package1 from "../../assets/package6.jpg";
import restaurant from "../../assets/restaurants.jpg";
import ticket from "../../assets/tickets1.jpg";
import { useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const images = [
  {
    src: hotel,
    title: "Book hotel for your destination",
    Desc: "Book luxiurious hotels at affordable prices including basic amenities like free Wi-Fi, breakfast, and car parking",
    link: "/hotels",
  },
  {
    src: package1,
    title: "Explore our travel packages",
    Desc: "Our variety of packages will provide you the best experience for your trip, wheater it is a family vacation, honeymoon, or solo trip.",
    link: "/packages",
  },
  {
    src: restaurant,
    title: "Find Restaurants in your area",
    Desc: "Celebrate your special moments in your nereast restaurants with tasty meals and delicious desserts",
    link: "/restaurant",
  },
  {
    src: ticket,
    title: "Book Flights, trains, and buses",
    Desc: "We offer a variety of transportation options including flights, trains, and buses to help you reach your destination conveniently.",
    link: "/ticket",
  },
];

const Carousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };
  const changeSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full h-[60vh]  mx-auto mt-20">
      <div className="w-full h-full px-10">
        {/* images */}
        <div className="hover:border-2 hover:border-pink-500 rounded-2xl">
          {images?.map((item, index) => {
            if (currentIndex === index) {
              return (
                <Link
                  to={`${item?.link}`}
                  key={index}
                  className="w-full h-full overflow-hidden relative "
                >
                  <img
                    src={item?.src}
                    alt={`${item?.title}Image`}
                    className="w-full h-[60vh] object-fill rounded-2xl"
                  />
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2  text-center">
                    <h2 className="text-pink-700 text-xl md:text-4xl font-bold">
                      {item?.title}
                    </h2>
                    <p className="text-slate-300 text-base md:text-lg font-semibold mt-2">
                      {item?.Desc}
                    </p>
                  </div>

                  {/* arrows */}
                  <div className="w-full h-full absolute bottom-0 left-0 flex items-center justify-between px-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        prevSlide();
                      }}
                      className="z-10 cursor-pointer hover:scale-110 transition-transform duration-300"
                    >
                      <IoIosArrowDropleftCircle className="text-pink-700 hover:text-slate-300 w-14 h-14" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        nextSlide();
                      }}
                      className="z-10 cursor-pointer hover:scale-110 transition-transform duration-300"
                    >
                      <IoIosArrowDroprightCircle className="text-pink-700 hover:text-slate-300 w-14 h-14" />
                    </button>
                  </div>

                  {/* indicators */}
                  <div className="w-full h-10 absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2">
                    {images?.map((_, index) => {
                      return (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            changeSlide(index);
                          }}
                          className={`${
                            currentIndex === index
                              ? "bg-slate-300 w-5 h-5"
                              : "bg-pink-600 w-4 h-4"
                          }  rounded-full cursor-pointer`}
                        ></div>
                      );
                    })}
                  </div>
                </Link>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

