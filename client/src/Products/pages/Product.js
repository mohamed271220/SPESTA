import React from "react";
import UpperSec from "../components/UpperSec";
import Chart from '../components/Chart/Chart'
import "../index.css";
const Product = () => {
  return (
    <div>
      <UpperSec  />
      <div className="product-middle-section">
        <div className="product-reviews__stars">
            {/* <Chart/> */}
        </div>
        <div className="product-reviews__comments"></div>
      </div>

      <div className="product-lower-section">some slider</div>
    </div>
  );
};

export default Product;
