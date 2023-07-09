import React from "react";
import { Link } from "react-router-dom";
import orders from "../assets/orders.png";
import address from "../assets/address.png";
import payment from "../assets/payment.png";
import security from "../assets/security.png";
import "../index.css";
const Profile = () => {
  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Account</h1>
      <div className="profile-control">
        <div className="profile-control-item">
          <Link>
            <img src={orders} alt="orders" /> <h2>Your Orders</h2>
          </Link>
        </div>
        <div className="profile-control-item">
          <Link>
            <img src={address} alt="address" /> <h2>Your addresses</h2>
          </Link>
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
      <div className="m-orders"></div>
      <div className="m-buy-again"></div>
    </div>
  );
};

export default Profile;