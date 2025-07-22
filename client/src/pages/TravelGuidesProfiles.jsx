import React, { useState, useRef } from 'react';
import './styles/TravelGuidesCarousel.css';

const guides = [
  {
    name: "Aarav Mehta",
    expertise: "Himalayan Treks",
    bio: "Certified mountain guide with 10+ years of experience leading treks in the Indian Himalayas.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    details: {
      location: "Manali, Himachal Pradesh",
      languages: "English, Hindi",
      certifications: "Mountaineering Certified (IMF)",
      experience: "Over 50 successful expeditions",
      contact: "aarav.treks@example.com",
    }
  },
  {
    name: "Sofia Rossi",
    expertise: "Italian Cities & Culture",
    bio: "Passionate about art, food, and history. Fluent in English and Italian. Rome-based.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    details: {
      location: "Rome, Italy",
      languages: "Italian, English",
      certifications: "European Cultural Guide",
      experience: "Expert in food tours and city history",
      contact: "sofia.culture@example.com",
    }
  },
  {
    name: "James Carter",
    expertise: "African Safaris",
    bio: "Wildlife expert and safari guide, specializing in Kenya and Tanzania national parks.",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    details: {
      location: "Nairobi, Kenya",
      languages: "English, Swahili",
      certifications: "Wildlife Tourism Certified",
      experience: "Led over 200 safaris",
      contact: "james.safari@example.com",
    }
  },
  {
    name: "Mei Lin",
    expertise: "East Asia Tours",
    bio: "Licensed guide for Japan, China, and South Korea. Loves sharing local traditions and cuisine.",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
    details: {
      location: "Tokyo, Japan",
      languages: "Japanese, Chinese, Korean, English",
      certifications: "East Asia Tourism License",
      experience: "Cultural guide for 8+ years",
      contact: "mei.eastasia@example.com",
    }
  },
];

const TravelGuidesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const profileRef = useRef(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + guides.length) % guides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % guides.length);
  };

  const viewProfile = (guide) => {
    setSelectedGuide(guide);
    setTimeout(() => {
      profileRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="travel-guides-section" style={{ scrollMarginTop: '80px' }}>
      <h1 className="main-heading">Travel Guides</h1>
      <marquee className="sub-caption" scrollamount="5">
        Explore the world with our expert local guides – from Himalayan treks to Italian culture and African safaris.
      </marquee>

      <div className="carousel-container">
        <button className="carousel-btn left" onClick={prevSlide}>&lt;</button>

        <div className="carousel-track">
          {guides.map((guide, index) => {
            let position = 'hidden';
            if (index === currentIndex) position = 'center';
            else if (index === (currentIndex + 1) % guides.length) position = 'right';
            else if (index === (currentIndex - 1 + guides.length) % guides.length) position = 'left';

            return (
              <div key={index} className={`card ${position}`}>
                <div className="card-image">
                  <img src={guide.image} alt={guide.name} />
                </div>
                <div className="card-info">
                  <h3>{guide.name}</h3>
                  <p className="expertise">{guide.expertise}</p>
                  <p className="bio">{guide.bio}</p>
                  <button className="view-btn" onClick={() => viewProfile(guide)}>View Profile</button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="carousel-btn right" onClick={nextSlide}>&gt;</button>
      </div>

      {selectedGuide && (
        <div className="profile-section" ref={profileRef}>
          <div className="profile-heading">
            <div className="line" />
            <h2>{selectedGuide.name}'s Profile</h2>
            <div className="line" />
          </div>

          <div className="profile-details-box">
            <img src={selectedGuide.image} alt={selectedGuide.name} className="profile-pic" />
            <div className="profile-text">
              <p><strong>Expertise:</strong> {selectedGuide.expertise}</p>
              <p><strong>Bio:</strong> {selectedGuide.bio}</p>
              <p><strong>Location:</strong> {selectedGuide.details.location}</p>
              <p><strong>Languages:</strong> {selectedGuide.details.languages}</p>
              <p><strong>Certifications:</strong> {selectedGuide.details.certifications}</p>
              <p><strong>Experience:</strong> {selectedGuide.details.experience}</p>
              <p><strong>Contact:</strong> {selectedGuide.details.contact}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TravelGuidesCarousel;
