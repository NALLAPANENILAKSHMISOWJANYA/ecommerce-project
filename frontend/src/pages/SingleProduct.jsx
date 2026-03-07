import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from '../Router/api'
import "../comp_css/SingleProduct.css";
import axios from "axios";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const userid = localStorage.getItem("userid");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Available size options - customize based on your ice cream products
  const sizeOptions = [
    { id: "small", label: "Small Cup (100ml)", price: 0 },
    { id: "medium", label: "Medium Cup (200ml)", price: 30 },
    { id: "large", label: "Large Cup (300ml)", price: 60 },
    { id: "pint", label: "Pint (500ml)", price: 100 },
    { id: "family", label: "Family Pack (1L)", price: 180 }
  ];

  useEffect(() => {
    axios
      .get(`https://ecommerce-project-backend-523y.onrender.com/ecom/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [productId]);

  const addProductToCart = (productid) => {
    // Validate if a size is selected
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    const sizeOption = sizeOptions.find(option => option.id === selectedSize);
    const totalPrice = (Number(product.price) + sizeOption.price) * quantity;

    // Create a cart item object with all necessary information
    const cartItem = {
      productId: productid,
      size: selectedSize,
      quantity: quantity,
      price: totalPrice
    };

    api
      .post(
        `/ecom/cart/add-product?userId=${userid}&productId=${productid}`
      )
      .then((response) => {
        localStorage.setItem("cartid", response.data.cartId);
        alert("Product added to Cart.....");
      })
      .catch((error) => {
        alert("Product already in cart or error adding product......");
      });
  };

  // Calculate total price based on base price, selected size, and quantity
  const calculateTotalPrice = () => {
    if (!product.price || !selectedSize) return 0;

    const sizeOption = sizeOptions.find(option => option.id === selectedSize);
    const sizeAdditionalPrice = sizeOption ? sizeOption.price : 0;

    return (Number(product.price) + sizeAdditionalPrice) * quantity;
  };

  return (
    <>
      <h1 style={{ color: "green", textAlign: "center", margin: "20px" }}>Single Product </h1>
      <div className="product-container">

        <div className="product-details">
          <div className="product_image">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className="product_details">
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Base Price: ₹ {product.price}</p>

            {/* Size Selection */}
            <div className="size-selection">
              <h3>Select Size:</h3>
              <div className="size-options">
                {sizeOptions.map((option) => (
                  <div key={option.id} className="size-option">
                    <input
                      type="radio"
                      id={option.id}
                      name="size"
                      value={option.id}
                      checked={selectedSize === option.id}
                      onChange={() => setSelectedSize(option.id)}
                    />
                    <label htmlFor={option.id}>
                      {option.label} {option.price > 0 && `(+₹${option.price})`}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="quantity-selection">
              <h3>Select Quantity:</h3>
              <div className="quantity-control">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="quantity-input"
                />
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            {selectedSize && (
              <div className="total-price">
                <h3>Total Price: ₹ {calculateTotalPrice()}</h3>
              </div>
            )}

            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                onClick={() => {
                  addProductToCart(product.productId);
                }}
                disabled={!selectedSize}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="counter-box">
          <div>
            <button
              onClick={() => {
                navigate("/user/cart");
              }}
            >
              Move To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
