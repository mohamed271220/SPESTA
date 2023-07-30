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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../../shared/features/SpestaSlice";
import gaming from "../assets/gaming.jpg";
const Home = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setIsLoading] = React.useState(false);
  const [random, setRandom] = React.useState();
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.data);

  // console.log(data);
  React.useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/category");
        const data = await response.json();
        setCategories(data.data);
        setRandom(data.data[Math.floor(Math.random() * categories.length)]);
        // console.log(data);
      } catch (err) {}
      setIsLoading(false);
    };

    getCategories();
  }, [categories.length, dispatch]);
  if (!loading && categories && random) {
    // console.log(random);
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
          id={item}
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
          {/* TODO: PUT IN IT'S OWN COMPONENT */}
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
                      <p className="category-box-name category-box-more">
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
          {/* TODO: PUT IN IT'S OWN COMPONENT */}
          <div className="product-section-container">
            {!loading && random && !isLoading ? (
              <div className="product-section">
                <h1>Recommended Products</h1>
                <Carousel
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  responsive={responsive}
                >
                  {products.products
                    ?.map((item) => (
                      <Product
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        url={item.images[0]}
                        price={item.price}
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
            {!loading && random && !isLoading ? (
              <div className="product-section">
                <h1>Deals</h1>
                <Carousel
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  responsive={responsive}
                >
                  {products.products
                    ?.map((item) => (
                      <Product
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        url={item.images[0]}
                        price={item.price}
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
            {/* TODO: PUT IN IT'S OWN COMPONENT */}
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
          {/* TODO: PUT IN IT'S OWN COMPONENT */}
          {!loading && random && !isLoading && (
            <div className="special-recommend">
              <div className="special-recommend-container">
                {
                  categories
                    .find((item) => item.name === "Electronics")
                    .products.map((item) => (
                      <div>
                        <Product
                          className="featured-product"
                          key={item.name}
                          name={item.name}
                          url={item.images[0]}
                          price={item.price}
                          description={item.description}
                        />
                      </div>
                    ))[0]
                }
              </div>
              <img src={gaming} alt="ex" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
