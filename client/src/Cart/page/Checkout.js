import React, { useState } from "react";

import Logo from "../../shared/components/Logo";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

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

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const id = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [choosed, setChoosed] = useState("");
  const navigate = useNavigate();
  if (!token) {
    navigate("/cart");
  }

  React.useEffect(() => {
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
          console.log(response.data.user.address);
          setAddresses(response.data.user.address);
          setCart(response.data.user.cart);
          setChoosed(response.data.user.address[0]._id);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getCart();
  }, [token, id]);

  const orderHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = toast.loading("Please wait...");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/product/order",
        { address: choosed },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response) {
        console.log(response);
        toast.update(id, {
          render: "Product added to cart",
          type: "success",
          ...config,
          isLoading: false,
        });
        window.location.href = "/";
      }
    } catch (err) {
      toast.update(id, {
        render: "Failed to add product to cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
    setLoading(false);
  };

  return (
    <div className="checkout">
      <div className="checkout-header">
        <Logo mode={"secondary"} />
        <h1>Checkout ({cart.reduce((acc, item) => acc + item.number, 0)})</h1>
      </div>

      <h1 className="checkout-body-h1">Choose a shipping address</h1>
      <div className="checkout-body">
        <div className="checkout-body-left">
          <div className="checkout-body-left-title">
            <h2>Shipping Address</h2>
          </div>
          <div className="checkout-body-left-address-list">
            {addresses ? (
              addresses.map((address) => (
                <div
                  key={address._id}
                  className={`checkout-body-left-address ${
                    choosed === address._id ? "active-itemlist" : ""
                  }`}
                >
                  <p>
                    <span className="circle"></span>
                    <input
                      type="checkbox"
                      name="favorite_pet"
                      value={address._id}
                      checked={address._id === choosed ? true : false}
                      onChange={() => setChoosed(address._id)}
                    />
                    <span>{address.street}</span> , {address.city} ,
                    {address.description}
                  </p>
                </div>
              ))
            ) : (
              <Link to="/profile">No addresses found</Link>
            )}
          </div>
          <div className="checkout-body-left-address-add">
            <form onSubmit={orderHandler}>
              <button type="submit">Use this address and issue order</button>
            </form>
            <p>Chosen address: {choosed}</p>
          </div>
        </div>
        <div className="checkout-body-right">
          <div className="checkout-body-right-title">
            <h2>Order Summary</h2>
            {cart.map((item) => (
              <div className="checkout-body-right-item">
                {item.name} x {item.number}
              </div>
            ))}
            <hr />
            total :{" "}
            {cart.reduce((acc, item) => acc + item.price * item.number, 0)} $
          </div>
        </div>
      </div>

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
export default Checkout;
