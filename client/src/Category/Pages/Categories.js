import React from "react";

import Hero from "../../Home/assets/Hero.png";
import ex from "../../Home/assets/ex.png";
import Product from "../../shared/components/UI/Product";
import "../index.css";
import { Link } from "react-router-dom";

import SkeletonPost from "../../shared/Loading/Skeleton/SkeletonPost";
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
        setLoading(false);
      } catch (err) {}
    };
    getCategories();
  }, []);
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
          <SkeletonPost />
        </div>
        ) : (
          <div>
            <img className="hero-img" src={Hero} alt="Hero" />
            <div className="category-container">
              {categories.map((item) => (
                <Link to={`/categories/${item._id}`} className="category-box">
                  <h3 className="category-box-name">{item.name}</h3>
                  <img src={`http://localhost:8080/${item.image}`} alt="ex" />
                </Link>
              ))}
            </div>
          </div>
        )}
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
