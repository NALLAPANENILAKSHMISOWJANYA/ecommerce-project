import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../comp_css/Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // Reset the thank you message after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h4>POLICY INFO</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Sale</li>
            <li>Terms of Use</li>
            <li>Report Abuse & Takedown Policy</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>COMPANY</h4>
          <ul>
            <li>carniwalls@gmail.com</li>
            <li>Contact Us</li>
            <li>Mobile.no: 9999999999</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>E-Commerce</h4>
          <ul>
            <li>Product App</li>
            <li>Sell on our Website</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>POPULAR LINKS</h4>
          <ul>
            <li>Top Product</li>
            <li>Classic flavours</li>
            <li>Nutted Icecreams</li>
            <li>Fruit-based flavours</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>SUBSCRIBE</h4>
          <form onSubmit={handleSubscribe} className="subscribe-box">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
          {subscribed ? (
            <p className="subscribe-message">Thanks for subscribing!</p>
          ) : (
            <p>Register now to get updates on promotions and coupons</p>
          )}
          <p className="admin-link">
            <Link to="/admin-Login" style={{color:"white"}}>Admin Access</Link>
          </p>
        </div>
      </div>
      <div className="footer-images">
      </div>
    </div>
  );
};

export default Footer;
