import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../comp_css/Product.css";
import api from "../Router/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceOrder, setPriceOrder] = useState("All");
  const [nameSearch, setNameSearch] = useState("");
  let userid = localStorage.getItem("userid");

  const filterProducts = (category, priceOrder, nameSearch, data) => {
    let filteredProducts = data;

    if (category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (priceOrder === "LowToHigh") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "HighToLow") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (nameSearch !== "") {
      const searchQuery = nameSearch.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    axios
      .get("https://ecommerce-project-backend-523y.onrender.com/ecom/products/all")
      .then((response) => {
        setProducts(response.data);
        filterProducts(selectedCategory, priceOrder, nameSearch, response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [selectedCategory, priceOrder, nameSearch]);

  const addProductToCart = (productid) => {
    api
      .post(`/ecom/cart/add-product?userId=${userid}&productId=${productid}`)
      .then((response) => {
        localStorage.setItem("cartid", response.data.cartId);
        alert("product added to Cart");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("Error To adding Product . Please try again later.");
          console.error("Error registering:", error);
        }
      });
  };

  return (
    <div className="product-page">
      <div className="filter-section">
        <div className="filter-header">
          <div className="filter-icon-circle">
            <i className="fa-solid fa-filter"></i>
          </div>
          <h2>Filter</h2>
        </div>

        <div className="filter-group">
          <label>Pick Color</label>
          <div className="color-swatches">
            <div className="swatch" style={{ background: '#ae7a7a' }}></div>
            <div className="swatch" style={{ background: '#d4885c' }}></div>
            <div className="swatch" style={{ background: '#6c5ce7' }}></div>
            <div className="swatch" style={{ background: '#00cec9' }}></div>
            <div className="swatch" style={{ background: '#55efc4' }}></div>
          </div>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="classic flavours">Classic Flavours</option>
            <option value="premium flavours">Premium Flavours</option>
            <option value="seasonal flavours">Seasonal Flavours</option>
            <option value="cones and bars">Cones and Bars</option>
            <option value="fruit based flavours">Fruit Based Flavours</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Brand</label>
          <div><input type="checkbox" /> Reymond</div>
          <div><input type="checkbox" defaultChecked /> Blue world</div>
          <div><input type="checkbox" defaultChecked /> Vanhuesen</div>
          <div><input type="checkbox" /> Bimboss</div>
          <div><input type="checkbox" /> Vanhuesen</div>
        </div>

        <div className="filter-group">
          <label>Price</label>
          <div><input type="radio" name="price" /> 50 - 100</div>
          <div><input type="radio" name="price" /> 100 - 150</div>
          <div><input type="radio" name="price" /> 150 - 200</div>
          <div><input type="radio" name="price" defaultChecked /> 200 - 250</div>
          <div><input type="radio" name="price" /> 250 - 300</div>
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h1>No products found</h1>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.productId}>
              <div className="card-top">
                <div className="badge">-32%</div>
                <div className="wishlist-icon">
                  <i className="fa-regular fa-heart"></i>
                </div>
                <Link to={`/product/${product.productId}`} className="product-image1">
                  <img src={product.imageUrl} alt={product.name} />
                </Link>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>

                <div className="rating-stars">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} style={{ color: '#ffc107' }}>{s}</span>
                  ))}
                  <span>(350)</span>
                </div>

                <div className="product-price">₹{product.price}</div>

                <div className="product-actions">
                  <button className="add-btn" onClick={() => addProductToCart(product.productId)}>
                    <i className="fa-solid fa-cart-shopping"></i> Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
