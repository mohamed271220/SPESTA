import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaRegCircleDot } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import hs from "../assets/hp.png";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../shared/features/cartSlice";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpperSec = ({ productData }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [defaultImg, setDefalutImg] = useState("");
  useEffect(() => {
    setDefalutImg(productData?.images[0]);
  }, []);
  const addItemToCartHandler = async () => {
    if (!token) {
      return toast.warn("you must login first", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const id = toast.loading("Please wait...");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/product/${productData._id}/cart`,
        { number: 1 },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      if (response) {
        toast.update(id, {
          render: "Product added to cart",
          type: "success",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          isLoading: false,
        });
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
      }
    } catch (error) {
      toast.update(id, {
        render: "Failed to add product to cart",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  const addItemToCartAndRedirectHandler = async () => {
    if (!token) {
      return toast.warn("you must login first", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const id = toast.loading("Please wait...");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/product/${productData._id}/cart`,
        { number: 1 },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      if (response) {
        toast.update(id, {
          render: "Product added to cart",
          type: "success",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          isLoading: false,
        });
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
        navigate("/checkout");
      }
    } catch (error) {
      toast.update(id, {
        render: "Failed to add product to cart",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  const [style, setStyle] = useState(``);
  return (
    <>
      <div className="product-upper-section">
        <div className="photos-slider">
          <img
            src={"http://localhost:8080/uploads" + defaultImg}
            alt="hp"
            className={`photos-slider__photo photos-slider__photo_main`}
          />
          <div className="alt-container">
            {productData?.images.length > 1 &&
              productData.images.map((image, index) => (
                <div
                  className={`image-border ${style === image && "active"}`}
                  onClick={() => {
                    setDefalutImg(image);
                    setStyle(image);
                  }}
                >
                  <img
                    src={"http://localhost:8080/uploads" + image}
                    alt={index}
                    className="photos-slider__photo"
                  />
                </div>
              ))}
          </div>
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
            <s>${productData?.price.toFixed(2)}</s> $
            {(
              productData?.price -
              productData?.price * productData?.sale
            ).toFixed(2)}
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
              $
              {(
                productData?.price -
                productData?.price * productData?.sale
              ).toFixed(2)}
            </p>
            <p className="purchase-controls__header-price-VAT">
              $
              {(
                productData?.price -
                productData?.price * productData?.sale
              ).toFixed(2)}
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
          <button
            onClick={addItemToCartAndRedirectHandler}
            className="purchase-controls__buy-now"
          >
            Buy Now
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default UpperSec;
