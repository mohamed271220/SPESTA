import React from "react";

import Hero from "../../Home/assets/Hero.png";
import ex from "../../Home/assets/ex.png";
import Product from "../../Home/components/Product";
import "../index.css";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../../Home/components/data";

import SkeletonPost from "../../shared/Loading/Skeleton/SkeletonPost";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:8080/api/category");
        const data = await response.json();
        setCategories(data.data);
        // console.log(data.data);
        setLoading(false);
      } catch (err) {}
    };
    getCategories();
  }, []);

  let product;
  if (!loading && categories) {
    product = categories[
      Math.floor(Math.random() * categories.length)
    ]?.products.map((item) => (
      <Product
        key={item.addedBy}
        name={item.name}
        url={item.images[0] && item.images[0]}
        price={item.price}
        description={item.description}
      />
    ));
    console.log(product);
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        {loading ? (
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
          <div>
            <img className="hero-img" src={Hero} alt="Hero" />
            <div className="category-container">
              {categories.map((item) => (
                <Link to={`/categories/${item._id}`} className="category-box">
                <div>

                  <h3 className="category-box-name">{item.name}</h3>
                  <img src={`http://localhost:8080/${item.image}`} alt="ex" />
                </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="product-section-container">
        <div className="product-section">
          <h1>Recommended for you</h1>
          {product && (
            <Carousel
              removeArrowOnDeviceType={["tablet", "mobile"]}
              responsive={responsive}
            >
              {product}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
