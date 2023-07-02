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
      <div className="home-container">
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
        <div className="product-section-container">
          <div className="product-section">
            <h1>Deals on Electronics</h1>
            <Carousel
              removeArrowOnDeviceType={["tablet", "mobile"]}
              responsive={responsive}
            >
              {product}
            </Carousel>
          </div>
          <div className="product-section">
            <h1>Deals on Another category</h1>
            <Carousel
              removeArrowOnDeviceType={["tablet", "mobile"]}
              responsive={responsive}
            >
              {product}
            </Carousel>
          </div>
        </div>
        <div className="product-recommendations-container">
          <div className="recommendations-box">
            <h1>Recommended for you</h1>
            <div className="recommendations-box-picks">
              <div className="recommendations-box-inner">
                <Product
                  key={""}
                  name={"test"}
                  url={
                    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  }
                  price={"18"}
                  description={"some description"}
                />
              </div>
              <div className="recommendations-box-inner">
                <Product
                  key={""}
                  name={"test"}
                  url={
                    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  }
                  price={"18"}
                  description={"some description"}
                />
              </div>
              <div className="recommendations-box-inner">
                <Product
                  key={""}
                  name={"test"}
                  url={
                    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  }
                  price={"18"}
                  description={"some description"}
                />
              </div>
              <div className="recommendations-box-inner">
                <Product
                  key={""}
                  name={"test"}
                  url={
                    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  }
                  price={"18"}
                  description={"some description"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
