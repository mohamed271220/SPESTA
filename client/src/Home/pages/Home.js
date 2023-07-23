import React from "react";

import Hero from "../assets/Hero2.png";
import ex from "../assets/ex.png";
import SelfCarousel from "../components/Carousel";
import AnotherCarousel from "../components/AnotherCarousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "../components/Product";
import { productData, responsive } from "../components/data";
import "../index.css";
import { Link } from "react-router-dom";
import Cat from "./Cat.png";
import { images } from "..//Helper/CarouselData";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
const Home = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/category");
        const data = await response.json();
        setCategories(data.data);
        console.log(data);
      } catch (err) {}
      setIsLoading(false);
    };
    getCategories();
  }, []);

  const product = productData.map((item) => (
    <Product
      key={item.name}
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
    />
  ));
  let randomProducts;
  if (!loading && categories) {
    randomProducts = categories[
      Math.floor(Math.random() * categories.length)
    ]?.products
      ?.map((item) => (
        <Product
          key={item.name}
          name={item.name}
          url={item.images[0]}
          price={item.price}
          description={item.description}
        />
      ))
      .slice(0, 5);
  }

  return (
    <>
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
        <div className="home-container">
          <div className="hero-section">
            <AnotherCarousel data={images} />
            <div className="category-container">
              {categories
                .map((item) => (
                  <Link to={`/categories/${item._id}`} className="category-box">
                    <div>
                      <p className="category-box-name">{item.name}</p>
                      <img
                        src={`http://localhost:8080/${item.image}`}
                        alt="ex"
                      />
                      <p
                        className="category-box-name"
                        style={{
                          color: "blue",
                        }}
                      >
                        See more deals
                      </p>
                    </div>
                  </Link>
                ))
                .sort(() => (Math.random() > 0.5 ? 1 : -1))
                .slice(0, 6)}

              <div className="category-box special">
                <Link to={"/categories"}>
                  <img src={Cat} alt="checkMoreCategories" />
                </Link>
              </div>
            </div>
          </div>
          <div className="product-section-container">
            {randomProducts && (
              <div className="product-section">
                <h1>Deals on various category</h1>
                <Carousel
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  responsive={responsive}
                >
                  {randomProducts}
                </Carousel>
              </div>
            )}
            <div className="product-section">
              <h1>Deals on Electronics</h1>
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
      )}
    </>
  );
};

export default Home;
