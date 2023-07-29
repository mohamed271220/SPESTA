import React from "react";
import { NavLink } from "react-router-dom";



const Orders = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div>
        <h2>No orders yet</h2>
        <NavLink to="/cart">Go to cart</NavLink>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div className="orders-controls">
        <NavLink>Orders</NavLink>
        <NavLink>Delivered Orders</NavLink>
      </div>

      <div className="orders-list">
        <div className="orders-numbers">
          <span>0 Orders</span> placed in{" "}
          <select>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
        </div>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Order Total</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.status}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              <tr>
                <td>#1234</td>
                <td>12/12/2020</td>
                <td>Delivered</td>
                <td>$100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
