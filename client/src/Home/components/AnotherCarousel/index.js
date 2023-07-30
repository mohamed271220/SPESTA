

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
      labels={false}
      centerSlidePercentage={70}
   
    >
      {props.data.map((item) => {
        return (
          <div key={item.image} className="carousel-item"  
          
          >
          <div class="pickgradient">

            <img
              className="carousel-item__image"
              src={item.image}
              alt={item.title}
            />
            
          </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default NewsCarousel;
