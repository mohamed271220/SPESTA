import React, { useState } from "react";
import UpperSec from "../components/UpperSec";
import Carousel from "react-multi-carousel";
import OneProduct from "../../shared/components/UI/Product";
import { responsive, productData } from "../../Home/components/data";

import "react-multi-carousel/lib/styles.css";
import "../index.css";
import MiddleSec from "../components/MiddleSec";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductData] = useState();
  const productId = useParams().productId;

  React.useEffect(() => {
    const findProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/products/${productId}`
        );
        const data  = response.data;
        if(response){

          setProductData(data.product);
          console.log(data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    findProductData();
  },[productId]);

  const [rating, setRating] = React.useState(0);
  return (
    <div className="product-section-full">
      <UpperSec productData={productData} />
      <div className="product-middle-section">
        <MiddleSec productData={productData} />
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
