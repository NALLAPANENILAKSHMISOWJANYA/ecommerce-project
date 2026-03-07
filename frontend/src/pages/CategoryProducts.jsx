import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Router/api';
import '../comp_css/CategoryProducts.css';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userid');
    setIsLoggedIn(!!userId);

    const fetchProducts = async () => {
      try {
        // Fetch all products first
        const response = await api.get('/ecom/products/all');
        // Filter products by category
        const filteredProducts = response.data.filter(
          product => product.category.toLowerCase() === categoryId.toLowerCase()
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const categoryTitles = {
    'classic flavours': 'Classic Flavors',
    'premium flavours': 'Premium Flavors',
    'seasonal flavours': 'Seasonal Flavors',
    'cones and bars': 'Cones and Bars',
    'fruit based flavours': 'Fruit Based Flavors'
  };

  const addToCart = async (productId) => {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      const response = await api.post(`/ecom/cart/add-product?userId=${userId}&productId=${productId}`);
      localStorage.setItem('cartid', response.data.cartId);
      alert('Product added to Cart');
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert('Error adding product to cart. Please try again later.');
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="category-products-container">
      <div className="category-header">
        <h1 className="category-title">{categoryTitles[categoryId] || categoryId}</h1>
        <p className="category-description">
          Discover our delicious {categoryTitles[categoryId]?.toLowerCase() || categoryId} collection
        </p>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <h2>No products found in this category</h2>
          <p>Please check back later for new additions</p>
          <button
            className="back-to-categories"
            onClick={() => navigate('/')}
          >
            Back to Categories
          </button>
        </div>
      ) : (
        <>
          <div className="products-count">
            Showing {products.length} products
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.productId} className="product-card">
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-info">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    {isLoggedIn ? (
                      <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product.productId)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="login-to-buy-btn"
                        onClick={handleLoginClick}
                      >
                        Login to Buy
                      </button>
                    )}
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/product/${product.productId}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryProducts; 