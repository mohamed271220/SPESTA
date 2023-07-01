import React from "react";

import Hero from "../assets/Hero2.png";
import ex from "../assets/ex.png";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../components/Product";
import { productData, responsive } from "../components/data";
import "../index.css";
const Home = () => {
  const product = productData.map((item) => (
    <Product
    key={item.name}
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
    />
  ));
  return (
    <>

    <div className="home-container" >
      <div className="hero-section">
        <img className="hero-img" src={Hero} alt="Hero" />
        <div className="category-container">
          <div className="category-box">
            <h2>title</h2>
            <img src={ex} alt="ex" />
            <p>see more</p>
          </div>
          <div className="category-box">
            <h2>title</h2>
            <img src={ex} alt="ex" />
            <p>see more</p>
          </div>
          <div className="category-box">
            <h2>title</h2>
            <img src={ex} alt="ex" />
            <p>see more</p>
          </div>
          <div className="category-box">
            <h2>title</h2>
            <img src={ex} alt="ex" />
            <p>see more</p>
          </div>
        </div>
      </div>
<div className="product-section">

        <Carousel showDots={true} responsive={responsive}>
          {product}
        </Carousel>
</div>
    </div>


    </>
  );
};

export default Home;
