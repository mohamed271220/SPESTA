import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../shared/features/cartSlice";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItem from "../components/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  // var items = useSelector((state) => state.cart.items);
  const [total, setTotal] = React.useState(0);
  const auth = useContext(AuthContext);
  const [cartItems, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // console.log(items);
  const id = auth.userId;

  const config = {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const removeItemHandler = async (productId, price) => {
    const id = toast.loading("Please wait...");
    //api/product/productId/cart/remove
    try {
      const response = await axios.put(
        "http://localhost:8080/api/product/" + productId + "/cart/remove",
        {
          number: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      if (response) {
        setTotal((prevStat) => (prevStat = prevStat - price));
        toast.update(id, {
          render: "Product removed from cart",
          type: "success",
          ...config,
          isLoading: false,
        });
        dispatch(cartActions.removeItemFromCart(productId));
        setItems(response.data.user.cart);

        dispatch(
          cartActions.setCart({
            items: response.data.user.cart,
            totalQuantity: response.data.user.cart
              .map((item) => item.number)
              .reduce((partialSum, a) => partialSum + a, 0),
          })
        );
      }
    } catch (err) {
      toast.update(id, {
        render: "Failed to remove product from cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
  };

  const addItemToCartHandler = async ({ productId, name, price, sale }) => {
    setTotal((prevStat) => (prevStat += price));
    if (!auth.token) {
      return toast.warn("you must login first", {});
    }

    const id = toast.loading("Please wait...");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/product/${productId}/cart`,
        { number: 1 },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(response);
      if (response) {
        toast.update(id, {
          render: "Product added to cart",
          type: "success",
          ...config,
          isLoading: false,
        });
        // console.log(productData);
        setItems(response.data.user.cart);

        dispatch(
          cartActions.addItemToCart({
            id: productId,
            name: name,
            price: price,
            sale: sale,
            // image: productData?.images[0],
          })
        );
      }
    } catch (error) {
      toast.update(id, {
        render: "Failed to add product to cart",
        type: "error",
        isLoading: false,
        ...config,
      });
    }
  };


  useEffect(() => {
    setLoading(true);
    const getCart = async () => {
      try {
        const response = await axios(
          "http://localhost:8080/api/auth/user/" + id,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        if (response) {
          // console.log(response.data.user.cart);
          setItems(response.data.user.cart);
          dispatch(
            cartActions.setCart({
              items: response.data.user.cart,
              totalQuantity: response.data.user.cart
                .map((item) => item.number)
                .reduce((partialSum, a) => partialSum + a, 0),
            })
          );
        }

        setTotal(
          response.data.user.cart
            .map((item) => item.price * item.number)
            .reduce((partialSum, a) => partialSum + a, 0)
        );

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getCart();
  }, [auth.token, id, dispatch]);

  return (
    <div className="cart-container">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            <h2>Shopping Cart</h2>
            <p> Deselect all items</p>
            <hr  />

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                cartItems.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      addItemToCartHandler={addItemToCartHandler}
                      removeItemHandler={removeItemHandler}
                    />
                  );
                })
              )}
              <hr className="line-cart" />
              <p className="cart-total">Subtotal : ${total} </p>
            </div>
          </div>
          <div></div>
          <div></div>
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Cart;
