import React, { useContext, useRef } from "react";
import { FaStar } from "react-icons/fa6";
import Chart from "./Chart/Chart";
import axios from "axios";

import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

const styles = {
  container: {
    display: "flex",
    marginBottom: "1rem",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,

    width: 300,
    padding: 10,
  },
};
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const MiddleSec = ({ productData }) => {
  const reviewsLength = productData?.reviews.length;
  const [open, setIsOpen] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(0);
  const [hoverValue, setHoverValue] = React.useState(undefined);
  const textArea = useRef(null);
  const stars = Array(5).fill(0);
  const token = useSelector((state) => state.auth.token);

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (textArea.current.value.trim() === "" || currentValue === 0) {
      setError("Please fill all the fields");
      return;
    }
    const data = {
      rating: currentValue,
      comment: textArea.current.value,
    };
    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:8080/api/product/${productData._id}/review`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsOpen(false);
      setLoading(false);
    } catch (err) {
      setIsOpen(false);
      setLoading(false);
      setError(
        err.response.data.message || err.message || "Something went wrong"
      );
    }

    // console.log(data);
  };

  return (
    <>
      <div className="product-reviews__stars">{/* <Chart/> */}</div>
      <div className="product-reviews__comments">
        <div className="product-reviews__comments-reviews">
          <h2>Customers Reviews:</h2>
          <div className="product-reviews__comments-stars">
            {productData?.rating || 0}
            {[...Array(5)].map((star, i) => {
              const currentRating = productData?.rating;
              return (
                <label>
                  <FaStar
                    size={20}
                    color={i < currentRating ? "#ffd700" : "#e4e5e9"}
                  />
                </label>
              );
            })}
            <Chart
              dataPoints={[
                // the percentage of reviews
                {
                  label: "1",
                  value:
                    (productData?.reviews.filter(
                      (review) => review.rating === 1
                    ).length /
                      reviewsLength) *
                    100,
                },
                {
                  label: "2",
                  value:
                    (productData?.reviews.filter(
                      (review) => review.rating === 2
                    ).length /
                      reviewsLength) *
                    100,
                },
                {
                  label: "3",
                  value:
                    (productData?.reviews.filter(
                      (review) => review.rating === 3
                    ).length /
                      reviewsLength) *
                    100,
                },
                {
                  label: "4",
                  value:
                    (productData?.reviews.filter(
                      (review) => review.rating === 4
                    ).length /
                      reviewsLength) *
                    100,
                },
                {
                  label: "5",
                  value:
                    (productData?.reviews.filter(
                      (review) => review.rating === 5
                    ).length /
                      reviewsLength) *
                    100,
                },
              ]}
            />
          </div>
        </div>
        <div className="product-reviews__comments-section">
          <h2>Top Reviews</h2>

          {productData?.reviews.map((review, i) => {
            return (
              <div className="product-reviews__comments-section-reviews">
                <div className="user-details">
                  <div className="user-details-image-name">
                    <img
                      className="user-details-image"
                      src={"http://localhost:8080/" + review?.user.image}
                      alt=""
                    />
                    <h3>{review?.user.name}</h3>
                  </div>
                  <div className="user-details-stars">
                    {review?.rating}
                    {[...Array(5)].map((star, i) => {
                      const currentRating = review?.rating;
                      return (
                        <label>
                          <FaStar
                            size={20}
                            color={i < currentRating ? "#ffd700" : "#e4e5e9"}
                          />
                        </label>
                      );
                    })}
                    <p>Reviewed in the {review?.createdAt}</p>
                  </div>
                </div>
                <div className="user-details-comment">{review?.content}</div>
              </div>
            );
          })}
          {!open &&token && (
            <button
              style={styles.button}
              className="product-reviews__comments-section-button"
              onClick={() => setIsOpen(true)}
            >
              Post your review
            </button>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {open && (
            <form onSubmit={formHandler} style={styles.container}>
              {loading && <LoadingSpinner asOverlay />}
              <h2> Add your review </h2>
              <div style={styles.stars}>
                {stars.map((_, index) => {
                  return (
                    <FaStar
                      key={index}
                      size={24}
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                      color={
                        (hoverValue || currentValue) > index
                          ? colors.orange
                          : colors.grey
                      }
                      style={{
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                    />
                  );
                })}
              </div>
              <textarea
                placeholder="What's your experience?"
                style={styles.textarea}
                ref={textArea}
              />

              <button
                disabled={currentValue === 0}
                className={"product-reviews__comments-section-button"}
                style={styles.button}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MiddleSec;
