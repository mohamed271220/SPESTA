import React from "react";
import { FcAddImage } from "react-icons/fc";
import { FcBadDecision } from "react-icons/fc";
const CartItem = ({ item, addItemToCartHandler, removeItemHandler }) => {
  return (
    <div key={item.product} className="cart-item">
      <img src={`http://localhost:8080/uploads${item.image}`} alt={item.name} />
      <div className="cart-item-details">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-price">
          <span>-{item.sale * 100}%</span> ${Math.round(item.price)}
        </p>
        <div className="cart-item-qty">
          <p>Qty: {item.number}</p>
        </div>
        <div className="cart-item-buttons">
          <button
            onClick={() =>
              addItemToCartHandler({
                productId: item.product,
                name: item.name,
                price: item.price,
                sale: item.sale,
              })
            }
          >
            <FcAddImage /> Add one
          </button>
          <button onClick={() => removeItemHandler(item.product, item.price)}>
            <FcBadDecision /> Delete one
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
