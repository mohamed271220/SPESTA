import React from "react";
import AddAddress from "../assets/AddAddress.svg";
import '../index.css'
const Addresses = () => {
  return (
    <div>
      <h2>Your Addresses</h2>
      <div className="addresses-container">
        <div className="address-card">
            <h3>Address 1</h3>
         
            <p>Street Address</p>
            <p>Some detailed description of the address</p>
            <div className="address-controls">
                <button>Edit</button>
                <button>Remove</button>
                <button>Set as default</button>
            </div>
        </div>
      
        <div className="address-card">
            <h3>Address 1</h3>
         
            <p>Street Address</p>
            <p>Some detailed description of the address</p>
            <div className="address-controls">
                <button>Edit</button>
                <button>Remove</button>
                <button>Set as default</button>
            </div>
        </div>
      
        <div className="address-card">
            <h3>Address 1</h3>
         
            <p>Street Address</p>
            <p>Some detailed description of the address</p>
            <div className="address-controls">
                <button>Edit</button>
                <button>Remove</button>
                <button>Set as default</button>
            </div>
        </div>
      
        <div className="address-card">
            <h3>Address 1</h3>
         
            <p>Street Address</p>
            <p>Some detailed description of the address</p>
            <div className="address-controls">
                <button>Edit</button>
                <button>Remove</button>
                <button>Set as default</button>
            </div>
        </div>
      
        <div className="add-address-button">
          <button>
            <img src={AddAddress} alt="add address" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
