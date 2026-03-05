import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../comp_css/AllProductAdmin.css";
import axios from "axios";
import api from "../Router/api";
import UpdateProductForm from "./UpdateProductForm";

const AllProductAdmin = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [nameSearch, setNameSearch] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filterProducts = (category, search, data) => {
    let filtered = data;
    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }
    if (search !== "") {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredProducts(filtered);
  };

  const updateProduct = (productIdToUpdate) => {
    const productToUpdate = products.find(
      (product) => product.productId === productIdToUpdate
    );
    setSelectedProduct(productToUpdate);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setShowUpdateModal(false);
  };

  const handleUpdate = (updatedProduct) => {
    api
      .put(`/ecom/products/update/${updatedProduct.productId}`, updatedProduct)
      .then((response) => {
        const updatedList = products.map(p => p.productId === updatedProduct.productId ? response.data : p);
        setProducts(updatedList);
        filterProducts(selectedCategory, nameSearch, updatedList);
        closeUpdateModal();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const deleteProduct = (productIdToDelete) => {
    api
      .delete(`/ecom/products/${productIdToDelete}`)
      .then((response) => {
        alert(response.data);
        const updatedProducts = products.filter(
          (product) => product.productId !== productIdToDelete
        );
        setProducts(updatedProducts);
        filterProducts(selectedCategory, nameSearch, updatedProducts);
        setDeleted(true);
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
        alert(error.response?.data?.message || "Error deleting product");
      });
  };

  useEffect(() => {
    api
      .get("/ecom/products/all?sort=desc")
      .then((response) => {
        const sortedProducts = response.data.sort(
          (a, b) => b.productId - a.productId
        );
        setProducts(sortedProducts);
        filterProducts(selectedCategory, nameSearch, sortedProducts);
        setDeleted(false);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [productId, deleted]);

  useEffect(() => {
    filterProducts(selectedCategory, nameSearch, products);
  }, [selectedCategory, nameSearch]);

  return (
    <>
      <h1 style={{ color: "green", textAlign: "center", margin: "5px" }}>
        ALL Live Products{" "}
      </h1>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
        <div>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter By Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }}>
            <option value="All">All Categories</option>
            <option value="classic flavours">Classic flavours</option>
            <option value="premium flavours">Premium flavours</option>
            <option value="seasonal flavours">Seasonal flavours</option>
            <option value="cones and bars">Cones and Bars</option>
            <option value="fruit based flavours">Fruit based flavours</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
          />
        </div>
      </div>

      {showUpdateModal && (
        <div className="update-modal">
          <UpdateProductForm product={selectedProduct} onUpdate={handleUpdate} onClose={closeUpdateModal} />
        </div>
      )}

      <div className="product-container1">
        {filteredProducts.map((product) => (
          <div className="product-card1" key={product.productId}>
            <div className="product-image11">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info1">
              <h2>{product.name}</h2>
              <p>Product ID: {product.productId}</p>
              <p>Category: {product.category}</p>
              <p>
                Description:{" "}
                {product.description.length > 30
                  ? product.description.substring(0, 50) + "..."
                  : product.description}
              </p>

              <h2 className="product-price1">Price: ₹ {product.price}</h2>
              <div className="button-container1">
                <button onClick={() => updateProduct(product.productId)}>
                  update
                </button>
                <button onClick={() => deleteProduct(product.productId)}>
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllProductAdmin;
