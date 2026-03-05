import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import "../comp_css/Slider.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "classic flavours",
      title: "Classic Flavors",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: "premium flavours",
      title: "Premium Flavors",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Ty2OKoCiqMwEOBETx93QIext7pVX2fjRRg&s"
    },
    {
      id: "seasonal flavours",
      title: "Seasonal Flavors",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmcosMQcQCv9KjjQ5E9LsSfQrvPMnND3bo0Q&s"
    },
    {
      id: "cones and bars",
      title: "Cones and Bars",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6WZDl-27T_5oqsv0PVzjNHyOZHXbU0kI7g&s"
    },
    {
      id: "fruit based flavours",
      title: "Fruit Based Flavors",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpIQ9O5NSTlFqdDf2MHzOcGNYAi1Y2nH8bSA&s"
    }
  ];

  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      title: "New Summer Collection",
      description: "Discover our refreshing new flavors for the season",
      buttonText: "Shop Now",
      buttonLink: "/product"
    },
    {
      url: "https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=744&q=80",
      title: "Special Offers",
      description: "Get 20% off on bulk orders this week",
      buttonText: "View Deals",
      buttonLink: "/product"
    },
    {
      url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      title: "Premium Flavors",
      description: "Experience our handcrafted premium ice cream collection",
      buttonText: "Explore Premium",
      buttonLink: "/category/premium"
    }
  ];

  const styleFixedImg = {
    width: "100%",
    height: "25vh",
    marginTop: "10px",
    marginBottom: "10px",
    objectFit: "cover",
    borderRadius: "8px"
  };

  const sliderContainerStyle = {
    marginBottom: "40px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    overflow: "hidden"
  };

  const categoryContainerStyle = {
    padding: "20px 0",
  };

  const categoryTitleStyle = {
    fontSize: "28px",
    fontWeight: "600",
    margin: "20px 0",
    color: "#333",
    textAlign: "center",
    position: "relative",
    paddingBottom: "15px"
  };

  const categoryTitleStyleAfter = {
    content: '""',
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "3px",
    backgroundColor: "#ff6b6b"
  };

  const cardboxStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto"
  };

  const categoryCardStyle = {
    borderRadius: "15px",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    backgroundColor: "#fff"
  };

  const categoryImageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    transition: "transform 0.3s ease"
  };

  const categoryLabelStyle = {
    padding: "20px",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "20px",
    color: "#333",
    backgroundColor: "#fff",
    transition: "background-color 0.3s ease"
  };

  const productListStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px"
  };

  const productCardStyle = {
    padding: "15px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const productInfoStyle = {
    flex: 1
  };

  const productNameStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px"
  };

  const productPriceStyle = {
    fontSize: "16px",
    color: "#ff6b6b",
    fontWeight: "500"
  };

  const productDescriptionStyle = {
    fontSize: "14px",
    color: "#666",
    marginTop: "5px"
  };

  useEffect(() => {
    document.title = 'Ice Cream Delight | Home';
    return () => { 
      document.title = 'Ice Cream Delight';
    };
  }, []); 

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Hero Banner Slider */}
      <div style={sliderContainerStyle}>
        <Slider images={slideImages} interval={5000} />
      </div>

      {/* Category Cards */}
      <div style={categoryContainerStyle}>
        <h2 style={categoryTitleStyle}>
          Shop By Category
          <span style={categoryTitleStyleAfter}></span>
        </h2>
        <div className="cardbox" style={cardboxStyle}>
          {categories.map((category) => (
            <div 
              key={category.id}
              style={categoryCardStyle}
              onClick={() => navigate(`/category/${category.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img 
                src={category.image} 
                alt={category.title} 
                style={categoryImageStyle}
              />
              <div style={categoryLabelStyle}>{category.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Category Products */}
      {selectedCategory && (
        <div style={productListStyle}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>{selectedCategory.title}</h3>
          {selectedCategory.products.map((product, index) => (
            <div key={index} style={productCardStyle}>
              <div style={productInfoStyle}>
                <div style={productNameStyle}>{product.name}</div>
                <div style={productDescriptionStyle}>{product.description}</div>
              </div>
              <div style={productPriceStyle}>{product.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;