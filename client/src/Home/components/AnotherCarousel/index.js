

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import React from "react";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

const NewsCarousel = (props) => {
  
  const navigate = useNavigate();
  return (
    <Carousel
      dynamicHeight
      stopOnHover
      showThumbs={false}
      showIndicators={false}
      // centerMode
      autoPlay
      labels
      centerSlidePercentage={70}
   
    >
      {props.data.map((item) => {
        return (
          <div className="carousel-item">
            <img
              className="carousel-item__image"
              src={item.image}
              alt={item.title}
            />
            <p className="legend">{item.title}</p>
          </div>
        );
      })}
    </Carousel>
  );
};

export default NewsCarousel;
