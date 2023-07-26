import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orders from "../assets/orders.png";
import address from "../assets/address.png";
import payment from "../assets/payment.png";
import security from "../assets/security.png";
import "../index.css";
import Orders from "../components/Orders";
import Addresses from "../components/Addresses";

import axios from "axios";
import LoadingSpinner from "../../shared/Loading/Skeleton/SkeletonPost";
import { useSelector } from "react-redux";

const Profile = () => {
  
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/auth/user/" + userId,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setUser(response.data.user);
        console.log(response);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(
          err.message || "Something went wrong" || err.response.data.message
        );
        // console.log(error);
      }
    };
    getData();
  }, [token, userId]);
  return (
    <>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="profile-container">
          <h1 className="profile-title">Your Account</h1>
          <div className="profile-control">
            <div className="profile-control-item">
              <a href={"#orders"}>
                <img src={orders} alt="orders" /> <h2>Your Orders</h2>
              </a>
            </div>
            <div className="profile-control-item">
              <a href={"#addresses"}>
                <img src={address} alt="address" /> <h2>Your addresses</h2>
              </a>
            </div>
            <div className="profile-control-item">
              <Link>
                <img src={payment} alt="payment" /> <h2>Your Payments</h2>
              </Link>
            </div>
            <div className="profile-control-item">
              <Link>
                <img src={security} alt="security" /> <h2>Login & security</h2>
              </Link>
            </div>
          </div>
          <div className="m-orders" id="orders">
            <Orders orders={user?.orders} />
          </div>
          <div className="m-addresses" id="addresses">
            <Addresses addresses={user?.address} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
