import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Orders = ({ orders }) => {
  const [content, setContent] = useState(
    orders &&
      orders.map((order) => (
        <tr>
          <td>{order._id}</td>
          <td>{order.createdAt.substring(0, 10)}</td>
          <td>{order.status}</td>
          <td>${order.totalPrice.toFixed(2)}</td>
        </tr>
      ))
  );

  const deliveredOrders =
    orders &&
    orders
      .filter((order) => order.status === "completed")
      .map((order) => (
        <tr>
          <td>{order._id}</td>
          <td>{order.createdAt.substring(0, 10)}</td>
          <td>{order.status}</td>
          <td>${order.totalPrice.toFixed(2)}</td>
        </tr>
      ));

  const allOrders =
    orders &&
    orders.map((order) => (
      <tr>
        <td>{order._id}</td>
        <td>{order.createdAt.substring(0, 10)}</td>
        <td
        className="status"
          style={{
            backgroundColor: `${
              order.status === "completed" ? "green" : "yellow"
            }`,
          }}
        >
          {order.status}
        </td>
        <td>${order.totalPrice.toFixed(2)}</td>
      </tr>
    ));

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
        <NavLink onClick={() => setContent(allOrders)}>Orders</NavLink>
        <NavLink onClick={() => setContent(deliveredOrders)}>
          Delivered Orders
        </NavLink>
      </div>

      <div className="orders-list">
        <div className="orders-numbers">
          <span>{orders.length} Orders</span> placed in{" "}
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
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
