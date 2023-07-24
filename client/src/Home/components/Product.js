import React from "react";

export default function Product(props) {
  const fillUrl = "https://www.w3schools.com/howto/img_avatar.png";
  return (
    <div className="card">
      <img
        className="product--image"
        src={props.url ? `http://localhost:8080/uploads${props.url}` : fillUrl}
        alt="product image"
      />
      <h4>{props.name}</h4>
      <p className="price">
        <span>19%off </span>{" "} {props.price}$
      </p>
      <p>{props.description}</p>
    </div>
  );
}
