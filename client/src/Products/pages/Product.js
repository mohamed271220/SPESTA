import React, { useState } from "react";
import UpperSec from "../components/UpperSec";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import OneProduct from "../../shared/components/UI/Product";
import { responsive, productData } from "../../Home/components/data";
import ProductItem from "../../Home/components/Product";
import "react-multi-carousel/lib/styles.css";
import "../index.css";
import MiddleSec from "../components/MiddleSec";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
import { useGetProductsQuery } from "../../shared/features/SpestaSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const {
    data: products,
    isLoading: prodIsLoading,
    isError,
    error,
  } = useGetProductsQuery();

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

      
           

              <div className="product-section-container">
                {!prodIsLoading && !isError && !isLoading ? (
                  <div className="product-section">
                    <h1>Recommended Products</h1>
                    <Carousel
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      responsive={responsive}
                    >
                      {products.products
                        ?.map((item) => (
                          <ProductItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            url={item.images[0]}
                            price={item.price}
                            sale={item.sale}
                            description={item.description}
                          />
                        ))
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 5)}
                    </Carousel>
                  </div>
                ) : (
                  <LoadingSpinner />
                )}
              </div>
      
        </>
      )}
    </div>
  );
};

export default Product;
