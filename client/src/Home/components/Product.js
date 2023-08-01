import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const fillUrl = "https://www.w3schools.com/howto/img_avatar.png";
  return (
    <Link
      // onClick={(e) => scrollTo(0, 0)}
      to={"/products/" + props.id}
      className={`card ${props.className}`}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <img
        className="product--image"
        src={props.url ? `http://localhost:8080/uploads${props.url}` : fillUrl}
        alt="product image"
      />
      <div>
        <h4>{props.name}</h4>
        <p className="price">
          <span>{Math.round(props.sale * 100)}%</span> {props.price.toFixed(2)}$
        </p>
        <p className="description">{props.description}</p>
      </div>
    </Link>
  );
}
