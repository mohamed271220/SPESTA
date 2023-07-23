import React from "react";

export default function Product(props) {
  return (
    <div className="card">
      <img className="product--image" src={'http://localhost:8080/uploads'+props.url} alt="product image" />
      <h4>{props.name}</h4>
      <p className="price">
        <span>19%off </span> {props.price}
      </p>
      <p>{props.description}</p>
    </div>
  );
}
