import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../shared/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [total, setTotal] = React.useState(0);
  console.log(items);

  const removeItemHandler = (productId, price) => {
    setTotal((prevStat) => (prevStat = prevStat - price));
    dispatch(cartActions.removeItemFromCart(productId));
  };
  const addItemHandler = ({ productId, name, price, sale }) => {
    setTotal((prevStat) => (prevStat += price));
    dispatch(
      cartActions.addItemToCart({
        id: productId,
        name,
        price,
        sale,
      })
    );
  };

  useEffect(() => {
    setTotal(
      items
        .map((item) => item.totalPrice)
        .reduce((partialSum, a) => partialSum + a, 0)
    );
  }, [items]);

  return (
    <div className="cart-container">
      <div className="cart-items-container">
        <h2>Shopping Cart</h2>
        <p> Deselect all items</p>
        <hr />

        <div className="cart-items">
          {items.map((item) => {
            return (
              <div key={item.productId} className="cart-item">
                <img
                  src={`http://localhost:8080/uploads${item.image}`}
                  alt={item.name}
                />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.title}</p>
                  <p className="cart-item-price">
                    <span>-{item.sale * 100}%</span> $
                    {Math.round(item.originalPrice)}
                  </p>
                  <div className="cart-item-qty">
                    <p>Qty: {item.number}</p>
                  </div>
                  <div className="cart-item-buttons">
                    <button>Delete from cart</button>
                    <button
                      onClick={() =>
                        addItemHandler({
                          productId: item.productId,
                          name: item.title,
                          price: item.originalPrice,
                          sale: item.sale,
                        })
                      }
                    >
                      +Add one
                    </button>
                    <button
                      onClick={() =>
                        removeItemHandler(item.productId, item.originalPrice)
                      }
                    >
                      -Delete one
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <hr />
          <p>Subtotal : ${total} </p>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Cart;
