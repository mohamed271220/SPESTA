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
  const [random, setRandom] = React.useState();

  React.useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/category");
        const data = await response.json();
        setCategories(data.data);
        setRandom(data.data[Math.floor(Math.random() * categories.length)]);
        console.log(data);
      } catch (err) {}
      setIsLoading(false);
    };
    getCategories();
  }, []);
  if (!loading && categories && random) {
    console.log(random);
    var productName = random.name;
  }
  let randomProducts;
  let categoryName;
  if (!loading && categories) {
    const randomItems =
      categories[Math.floor(Math.random() * categories.length)];
    categoryName = randomItems?.name ? randomItems.name : null;
    randomProducts =
      randomItems?.products
        ?.map((item) => (
          <Product
            key={item.name}
            name={item.name}
            url={item.images[0]}
            price={item.price}
            description={item.description}
          />
        ))
        .slice(0, 5) || randomItems;
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
                      <h4 className="category-box-name">{item.name}</h4>
                      <img
                        src={`http://localhost:8080/${item.image}`}
                        alt="ex"
                      />
                      <p
                        className="category-box-name category-box-more"
                       
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
            {!loading && random ? (
              <div className="product-section">
                <h1>Deals on {categoryName}</h1>
                <Carousel
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  responsive={responsive}
                >
                  {random.products.map((item) => (
                    <Product
                      key={item.name}
                      name={item.name}
                      url={item.images[0]}
                      price={item.price}
                      description={item.description}
                    />
                  ))}
                </Carousel>
              </div>
            ) : (
              <LoadingSpinner />
            )}
            
            <div className="product-section">
              {!loading && randomProducts ? (
                <>

              <h1>Deals on {categoryName}</h1>
                <Carousel
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  responsive={responsive}
                >
                  {randomProducts}
                </Carousel>
                </>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>
          <div className="product-recommendations-container">
            {/* <div className="">
              <h1>Recommended for you</h1>
              <Carousel
                removeArrowOnDeviceType={["tablet", "mobile"]}
                responsive={responsive}
              >
                {product}
              </Carousel>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
