import React, { useState, useEffect } from "react";
import "../comp_css/Slider.css";

const Slider = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{
              transform: `translateX(${100 * (index - currentIndex)}%)`,
            }}
          >
            <img src={image.url} alt={image.alt || `Slide ${index + 1}`} />
            <div className="slide-content">
              <h2>{image.title}</h2>
              <p>{image.description}</p>
              {image.buttonText && (
                <button 
                  className="slide-button"
                  onClick={() => window.location.href = image.buttonLink}
                >
                  {image.buttonText}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button className="slider-button prev" onClick={goToPrevious}>
        &#10094;
      </button>
      <button className="slider-button next" onClick={goToNext}>
        &#10095;
      </button>
      
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
