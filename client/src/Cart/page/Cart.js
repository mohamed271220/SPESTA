import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../shared/features/cartSlice";
import axios from "axios";

import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
import { responsive } from "../../Home/components/data";
import Product from "../../Home/components/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItem from "../components/CartItem";
import { useGetProductsQuery } from "../../shared/features/SpestaSlice";
import { Link, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import Carousel from "react-multi-carousel";
const Cart = () => {
  const dispatch = useDispatch();
  // var items = useSelector((state) => state.cart.items);
  const [total, setTotal] = React.useState(0);
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  console.log(products);
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.userId);
  const [cartItems, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  // console.log(items);
  // const id = auth.userId;

  const config = {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const removeItemHandler = async (productId, price) => {
    const id = toast.loading("Please wait...");
    //api/product/productId/cart/remove
    if (!token) {
      return toast.warn("you must login first", {});
    }
    try {
      const response = await axios.put(
        "http://localhost:8080/api/product/" + productId + "/cart/remove",
        {
          number: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response) {
        setTotal((prevStat) => (prevStat = prevStat - price));
        toast.update(id, {
          render: "Product removed from cart",
          type: "success",
          ...config,
          isLoading: false,
        });
        dispatch(cartActions.removeItemFromCart(productId));
        setItems(response.data.user.cart);

        dispatch(
          cartActions.setCart({
            items: response.data.user.cart,
            totalQuantity: response.data.user.cart
              .map((item) => item.number)
              .reduce((partialSum, a) => partialSum + a, 0),
          })
        );
      }
    } catch (err) {
      toast.update(id, {
        render: "Failed to remove product from cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
  };

  const addItemToCartHandler = async ({ productId, name, price, sale }) => {
    setTotal((prevStat) => (prevStat += price));
    if (!token) {
      return toast.warn("you must login first", {});
    }

    const id = toast.loading("Please wait...");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/product/${productId}/cart`,
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
          ...config,
          isLoading: false,
        });
        // console.log(productData);
        setItems(response.data.user.cart);

        dispatch(
          cartActions.addItemToCart({
            id: productId,
            name: name,
            price: price,
            sale: sale,
            // image: productData?.images[0],
          })
        );
      }
    } catch (error) {
      toast.update(id, {
        render: "Failed to add product to cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    const getCart = async () => {
      try {
        const response = await axios(
          "http://localhost:8080/api/auth/user/" + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response) {
          // console.log(response.data.user.cart);
          setItems(response.data.user.cart);
          dispatch(
            cartActions.setCart({
              items: response.data.user.cart,
              totalQuantity: response.data.user.cart
                .map((item) => item.number)
                .reduce((partialSum, a) => partialSum + a, 0),
            })
          );
        }

        setTotal(
          response.data.user.cart
            .map((item) => item.price * item.number)
            .reduce((partialSum, a) => partialSum + a, 0)
        );

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getCart();
  }, [token, id, dispatch]);

  return (
    <div>
      <div className="cart-container">
        {loading || isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* TODO: PUT IN IT'S OWN COMPONENT */}
            <div className="cart-items-container">
              <h2>Shopping Cart</h2>
              <p> Deselect all items</p>
              <hr />

              <div className="cart-items">
                {cartItems.length === 0 ? (
                  <p>Cart is empty</p>
                ) : (
                  cartItems.map((item) => {
                    return (
                      <CartItem
                        key={item.id}
                        item={item}
                        addItemToCartHandler={addItemToCartHandler}
                        removeItemHandler={removeItemHandler}
                      />
                    );
                  })
                )}
                <hr className="line-cart" />
                <p className="cart-total">Subtotal : ${total.toFixed(2)} </p>
              </div>
            </div>
            <div className="row-container">
              <div className="checkout-container">
                <p>
                  Total Items : <span> ${total.toFixed(2)} </span>
                </p>
                <button
                  // disabled={cartItems.length === 0 || !token}
                  className="checkout-btn"
                  onClick={() => {
                    if (!token) {
                      return toast.warn("you must login first", {});
                    }
                    if (cartItems.length === 0) {
                      return toast.warn(
                        "you must add something to cart first",
                        {}
                      );
                    }
                    navigate("/checkout");
                  }}
                >
                  Proceed To Checkout
                </button>
              </div>
              <div className="recommendation-container">
                <p>Also check</p>
                <div>
                  {products.products
                    ?.map((product) => (
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={`/products/${product._id}`}
                        key={product._id}
                        className="recommendation-item"
                      >
                        <img
                          src={`http://localhost:8080/uploads${product.images[0]}`}
                          alt=""
                        />
                        <div>
                          <p>{product.name}</p>
                          <p>${product.price}</p>
                          <span>
                            <AiFillStar
                              style={{
                                color: "gold",
                              }}
                            />{" "}
                            {product.rating}{" "}
                          </span>
                        </div>
                      </Link>
                    ))
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* TODO: PUT IN IT'S OWN COMPONENT */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="product-section last-in-page">
          <h1>Recommended Products</h1>
          <Carousel
            removeArrowOnDeviceType={["tablet", "mobile"]}
            responsive={responsive}
          >
            {products.products
              ?.map((item) => (
                <Product
                  id={item._id}
                  key={item.name}
                  name={item.name}
                  sale={item.sale}
                  url={item.images[0]}
                  price={item.price}
                  description={item.description}
                />
              ))
              .sort(() => Math.random() - 0.5)
              .slice(0, 5)}
          </Carousel>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Cart;
