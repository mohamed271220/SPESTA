import React from "react";
import { FaStar } from "react-icons/fa6";
import Chart from "./Chart/Chart";

const MiddleSec = ({ productData }) => {
  const reviewsLength = productData?.reviews.length;
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
                { label: "2", value:     (productData?.reviews.filter(
                      (review) => review.rating === 2
                    ).length /
                      reviewsLength) *
                    100, },
                { label: "3", value:     (productData?.reviews.filter(
                      (review) => review.rating === 3
                    ).length /
                      reviewsLength) *
                    100, },
                { label: "4", value: 
                (productData?.reviews.filter(
                      (review) => review.rating === 4
                    ).length /
                      reviewsLength) *
                    100, },
                { label: "5", value:     (productData?.reviews.filter(
                      (review) => review.rating === 5
                    ).length /
                      reviewsLength) *
                    100, },
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
          {/* <div className="product-reviews__comments-section-reviews">
            <div className="user-details">
              <div className="user-details-image-name">
                <img
                  className="user-details-image"
                  src={
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  }
                  alt=""
                />
                <h3>{productData?.reviews.user}</h3>
              </div>
              <div className="user-details-stars">
                4.4
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
                <p>Reviewed in the United States on February 26, 2022</p>
              </div>
            </div>
            <div className="user-details-comment">
              I had the Galaxy Buds Plus (Red) and I bought them in 2020. I was
              really happy with the overall use, function and feel of the Bud
              Plus. I ended up (by accident) washing and drying them in the
              laundry. After that I lost some of the functions of the earbuds.
              Not an issue with the replacement program that I also purchased
              with the buds here on Amazon through Asurion protection plan. I
              was able to replace the defective buds with new ones with
              absolutely no hassle. I ended up spending an extra $22.00 in the
              replacement because I re-added the protection plan which why not
              at this point, i'm a firm believer in service/replacement
              plans.When I ordered these Buds Pro's, I had read about all the
              current and new earbuds on the market and as I was doing my
              research, comparing new with the old and feature for feature, my
              first notice was the battery life is less than the old Bud Plus's.
              Significantly less out the box but for me that was not an issue to
              sway me away from the new Bud's Pro. None the less I started
              looking at other companies and saw reviews about them (other
              brands) that told me not to really mess with them. Not even worth
              calling out other brand names as I think that is a personal
              preference. I have been privy to Samsung brand for years, owning
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MiddleSec;
