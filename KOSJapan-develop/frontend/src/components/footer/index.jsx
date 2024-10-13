// Footer.jsx
import React from 'react';
import './index.scss'; // Ensure to import your SCSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h4>About KoiFish</h4>
          <p>Discover the beauty of Koi fish and learn about our farms.</p>
          <p>Block E2-7, D1, Street 3, Hie, Sapa, Lao Cai, Vietnam.</p>
          <p>District 5, Ho Chi Minh City, Vietnam.</p>
        </div>
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Tour</a></li>
            <li><a href="#">Koi Fish</a></li>
            <li><a href="#">Customer Service</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
          </ul>
        </div>
        <div className="footer-section customer-service">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Payment</a></li>
            <li><a href="#">Order Status</a></li>
          </ul>
        </div>
        <div className="footer-section newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe to get a 5% discount and stay updated with our latest offers.</p>
          <input type="email" placeholder="Enter your email" className="email-input" />
          <button className="sign-up-button">Sign Up</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 KoiFish. All rights reserved.</p>
        <p>Terms and Conditions | Privacy Policy | Refund Policy</p>
        <div className="payment-methods">
          <img src="path_to_payment_image_1" alt="Payment Method" />
          <img src="path_to_payment_image_2" alt="Payment Method" />
          <img src="path_to_payment_image_3" alt="Payment Method" />
          <img src="path_to_payment_image_4" alt="Payment Method" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
