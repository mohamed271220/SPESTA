import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaRegCircleDot } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import hs from "../assets/hp.png";
import { useDispatch } from "react-redux";
import { cartActions } from "../../shared/features/cartSlice";
import { AuthContext } from "../../shared/context/auth-context";
import axios from "axios";
const UpperSec = ({ productData }) => {
  const dispatch = useDispatch();
  const auth = useContext(AuthContext);
  const addItemToCartHandler = () => {
    if (!auth.token) {
      return alert("you must login first");
    }

    const addItem = async () => {
      const response = await axios(
        `http://localhost:8080/api/productss/${productData._id}/cart`,
        {}
      );
    };
    // console.log(productData);
    dispatch(
      cartActions.addItemToCart({
        id: productData._id,
        name: productData.name,
        price: productData.price,
        sale: productData.sale,
        image: productData?.images[0],
      })
    );
  };

  return (
    <>
      <div className="product-upper-section">
        <div className="photos-slider">
          <img
            src={"http://localhost:8080/uploads" + productData?.images[0]}
            alt="hp"
            className="photos-slider__photo"
          />
        </div>
        <div className="product-info">
          <div className="product-info__name">{productData?.name}</div>
          <Link className="product-info__provider-website">
            visit provider website
          </Link>
          <div className="product-info__rating">
            {productData?.rating || 0}{" "}
            <span className="star">
              {" "}
              <AiFillStar />
            </span>
          </div>
          <hr />
          <div className="product-info__price">
            <span className="discount">
              {"%" + productData?.sale * 100} OFF
            </span>{" "}
            <s>${productData?.price}</s>{" "}
            ${productData?.price - productData?.price * productData?.sale}
          </div>
          <div className="product-info__VAT">
            $202.78 Shipping & Import Fees Deposit to Egypt 🥲
          </div>
          <hr />
          <div className="product-info__description">
            <h2>About this product</h2>
            <p>{productData?.description}</p>
          </div>
        </div>
        <hr className="hello-im-under" />
        <div className="purchase-controls">
          <div className="purchase-controls__header">
            <div className="purchase-controls__header-icon-container">
              <h2>Buy Now :</h2>
              <div className="purchase-controls__header-icon">
                <FaRegCircleDot />
              </div>
            </div>
            <p className="purchase-controls__header-price">
              {productData?.price - productData?.price * productData?.sale}$
            </p>
            <p className="purchase-controls__header-price-VAT">
              {productData?.price - productData?.price * productData?.sale}$
              Shipping & Import Fees Deposit to Egypt🥲
            </p>
          </div>
          <div className="purchase-controls__location">
            <span>
              <HiOutlineLocationMarker />
            </span>
            Deliver to Egypt
          </div>
          <h2 className="stoke">In Stoke</h2>

          <button
            onClick={addItemToCartHandler}
            className="purchase-controls__add-to-cart"
          >
            Add to cart
          </button>
          <button className="purchase-controls__buy-now">Buy Now</button>
        </div>
      </div>
    </>
  );
};

export default UpperSec;
