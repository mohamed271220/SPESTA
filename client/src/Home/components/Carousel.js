import React, { useState } from "react";
import { images } from "../Helper/CarouselData";
import "./Carousel.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
const Carousel = () => {
  const [currImg, setCurrImg] = useState(0);

  return (
    <div className="carousel">
      <div
        className="carousel-item"
        style={{
          backgroundImage: `url(${images[currImg].image})`,
        //   transform: `translate(-${currImg * 100}%)`,
        }}
      >
        {/* <img src={images[currImg].image} alt="First slide" /> */}
        <div
          className="left"
          onClick={() => {
            currImg > 0
              ? setCurrImg(currImg - 1)
              : setCurrImg(images.length - 1);
          }}
        >
          <IoIosArrowBack style={{ fontSize: 30 }} />
        </div>
        <div className="center">
          {images[currImg].title !== "" && <h1>{images[currImg].title}</h1>}
          {images[currImg].subtitle !== "" && <p>{images[currImg].subtitle}</p>}
        </div>
        <div
          className="right"
          onClick={() =>
            currImg < images.length - 1
              ? setCurrImg(currImg + 1)
              : setCurrImg(0)
          }
        >
          <IoIosArrowForward style={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
