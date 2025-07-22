import React from "react";
import './styles/TravelPackages.css';

const packages = [
  {
    id: 1,
    title: "Tropical Paradise – Maldives",
    price: "₹49,999",
    duration: "5 Days / 4 Nights",
    image: "https://plus.unsplash.com/premium_photo-1692897456929-5774bd1c8e28?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "European Explorer – Italy & France",
    price: "₹89,999",
    duration: "7 Days / 6 Nights",
    image: "https://images.unsplash.com/photo-1533333980833-8340a468dfec?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Desert Delight – Dubai",
    price: "₹59,999",
    duration: "4 Days / 3 Nights",
    image: "https://images.unsplash.com/photo-1624664929067-5bc278a7c57e?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Himalayan Adventure – Manali",
    price: "₹19,999",
    duration: "6 Days / 5 Nights",
    image: "https://plus.unsplash.com/premium_photo-1661964400999-264ce5993f8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const TravelPackages = () => {
  return (
    <div className="packages-container">
      <h1 className="title">Explore Our Travel Packages</h1>
      <div className="package-grid">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <img src={pkg.image} alt={pkg.title} />
            <div className="card-content">
              <h2>{pkg.title}</h2>
              <p className="duration">{pkg.duration}</p>
              <p className="price">{pkg.price}</p>
              <button className="book-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelPackages;
