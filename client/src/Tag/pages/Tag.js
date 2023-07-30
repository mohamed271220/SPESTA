import React from "react";
import { AiFillStar } from "react-icons/ai";

import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
const Tag = () => {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState();
  const tagId = useParams().tagId;
  const [pageLimit, setPageLimit] = React.useState(12);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/tags");
        const data = await response.json();
        setCategories(data.data);
        const response2 = await fetch(
          "http://localhost:8080/api/tags/" + tagId
        );
        const data2 = await response2.json();
        setCategory(data2.data);
        console.log(data2.data);
        setLoading(false);
      } catch (err) {}
    };
    getCategories();
  }, [tagId]);
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
        <div className="single-category-container">
          <div className="category-links">
            {categories.map((item) => (
              <Link className="cate-links" to={`/tags/${item._id}`}>
                <p>{item.name}</p>
              </Link>
            ))}
          </div>

          <div className="category-content">
            <h1 className="category-title">{category?.name}</h1>
            <p className="category-description">{category?.description}</p>
            <div className="search-result">
              <p>
                {category?.products.length} results found for{" "}
                <span>{category?.name}</span>
              </p>
            </div>

            <div className="category-products">
              {category?.products
                .map((item) => (
                  <Link
                    to={`/products/${item._id}`}
                    className="category-product"
                  >
                    <img
                      src={
                        item?.images &&
                        "http://localhost:8080/uploads" + item.images[0]
                      }
                      alt=""
                    />
                    <p>{item.name}</p>
                    <div>
                      {item.rating} <AiFillStar /> rated by{" "}
                      {item?.reviews?.length}{" "}
                    </div>
                    <p>${item.price}</p>
                  </Link>
                ))
                .slice(0, pageLimit)}
            </div>
            <div
              onClick={() => setPageLimit(pageLimit + 12)}
              className="see-results"
              style={{ cursor: "pointer" }}
            >
              <h2>See all result</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tag;
