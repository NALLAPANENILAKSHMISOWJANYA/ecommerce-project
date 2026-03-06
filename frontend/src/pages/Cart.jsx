import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Router/api";
import "../comp_css/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  let cartId = localStorage.getItem("cartid");
  let userId = localStorage.getItem("userid");

  const apiCallOrderPlaced = () => {
    api
      .post(`/ecom/orders/placed/${userId}`)
      .then((response) => {
        alert("Order Placed Succesfuly.....");
        navigate("/user/order-details");
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  };

  const orderPlaced = () => {
    apiCallOrderPlaced();

  };
  const fetchCartData = () => {
    api
      .get(`/ecom/cart/products/${cartId}`)
      .then((response) => {
        setCartData(response.data);
        setTotalAmount(response.data.totalAmount);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  };

  useEffect(() => {
    document.title = "Ecommerse | Cart";
    if (cartId) {
      fetchCartData();
    }
  }, [cartId]);

  const emptyCart = () => {
    api
      .delete(`/ecom/cart/empty-Cart/${cartId}`)
      .then(() => {
        setTotalAmount(0);
        setCartData({ cartItems: [] });
        alert("All cart items removed");
      })
      .catch(() => {
        alert("Cart is empty");
      });
  };

  const removeProductfromCart = (productId) => {
    api
      .delete(`/ecom/cart/remove-product/${cartId}/${productId}`)
      .then(() => {
        alert("Product removed from cart");
        fetchCartData();
      })
      .catch(() => {
        alert("Error removing item");
      });
  };

  const incrementQuantity = (productId) => {
    api
      .put(`/ecom/cart/increase-productQty/${cartId}/${productId}`)
      .then((response) => {
        setCartData(response.data);
        setTotalAmount(response.data.totalAmount);
      })
      .catch((error) => {
        console.error("Error increasing quantity:", error);
      });
  };

  const decrementQuantity = (productId) => {
    api
      .put(`/ecom/cart/decrease-productQty/${cartId}/${productId}`)
      .then((response) => {
        setCartData(response.data);
        setTotalAmount(response.data.totalAmount);
      })
      .catch((error) => {
        console.error("Error decreasing quantity:", error);
      });
  };

  return (
    <div className="cart-page">
      {cartData.cartItems?.length > 0 ? (
        <div className="cart-list">
          {cartData.cartItems.map((item) => (
            <div className="cart-card" key={item.cartItemId}>
              <div className="cartproduct-image1">
                <img src={item.product.imageUrl} alt={item.product.name} />
              </div>
              <div className="cartproduct-info">
                <h2>{item.product.name}</h2>
                <p>Category: {item.product.category}</p>
                <p className="description">
                  {item.product.description.substring(0, 60)}...
                </p>
                <div className="cartproduct-price">₹{item.product.price}</div>

                <div className="increaseBtn">
                  <button onClick={() => decrementQuantity(item.product.productId)}>−</button>
                  <span style={{ fontSize: "18px", fontWeight: "600", minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button onClick={() => incrementQuantity(item.product.productId)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeProductfromCart(item.product.productId)}
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-cart-message">
          <h1>Your cart feels lonely.</h1>
          <p>Explore our latest flavors and fill it with joy!</p>
          <Link to="/">Explore Products</Link>
        </div>
      )}

      {cartData.cartItems?.length > 0 && (
        <div className="cart-details">
          <h2>ORDER SUMMARY</h2>
          <h2>₹{totalAmount}</h2>
          <div className="counter-box">
            <button onClick={orderPlaced}>Proceed to Checkout</button>
            <button onClick={() => emptyCart(cartId)}>Clear All Items</button>
            <button
              style={{ backgroundColor: '#f1f2f6', color: '#2d3436' }}
              onClick={() => navigate("/user/order-details")}
            >
              Order History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
