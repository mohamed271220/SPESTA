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
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";

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
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/products/${productId}`
        );
        const data = response.data;
        if (response) {
          setProductData(data.product);
          console.log(data.product);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    findProductData();
  }, [productId]);

  const [rating, setRating] = React.useState(0);
  return (
    <div className="product-section-full">
      {isLoading ? (
        <div

        style={{
            display: "flex",
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            // margin: "50%",
          }}
        >
        <LoadingSpinner />
        </div>
      ) : (
        <>
          <UpperSec productData={productData} />
          <div className="product-middle-section">
            <MiddleSec productData={productData} />
          </div>

          <div className="product-lower-section  product-section-container">
            <div className="product-section product-section-s">
              <h2>Recommended for you</h2>
              <Carousel
                removeArrowOnDeviceType={["tablet", "mobile"]}
                responsive={responsive}
              >
                {product}
              </Carousel>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
