import React from "react";
import UpperSec from "../components/UpperSec";
import Carousel from "react-multi-carousel";
import OneProduct from "../../shared/components/UI/Product";
import { responsive, productData } from "../../Home/components/data";

import "react-multi-carousel/lib/styles.css";
import "../index.css";
import MiddleSec from "../components/MiddleSec";
const product = productData.map((item) => (
  <OneProduct
    key={item.name}
    name={item.name}
    url={item.imageurl}
    price={item.price}
    description={item.description}
  />
));
const Product = () => {
  const [rating, setRating] = React.useState(0);
  return (
    <div className="product-section-full">
      <UpperSec />
      <div className="product-middle-section">
        <MiddleSec />
      </div>

      <div className="product-lower-section  product-section-container">
        <h2>Recommended for you</h2>
        <Carousel 
          removeArrowOnDeviceType={["tablet", "mobile"]}
          responsive={responsive}
        >
          {product}
        </Carousel>
      </div>
    </div>
  );
};

export default Product;
