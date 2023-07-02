import React from "react";

import Hero from '../../Home/assets/Hero.png';
import ex from "../../Home/assets/ex.png";
import Product from "../../shared/components/UI/Product";
import "../index.css";
const Categories = () => {
  return (
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
  );
};

export default Categories;
