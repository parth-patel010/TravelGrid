// client/src/components/GoToTopButton.jsx
import React, { useState, useEffect } from 'react';
import './GoToTopButton.css'; 

const GoToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    
    window.addEventListener('scroll', handleScroll);

  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showButton && (
        <button
          className="go-to-top-button"
          onClick={scrollToTop}
          aria-label="Go to top of page" 
        >
          &uarr; {/* Up arrow character */}
          {/* You could also use an SVG icon here */}
        </button>
      )}
    </>
  );
};

export default GoToTopButton;