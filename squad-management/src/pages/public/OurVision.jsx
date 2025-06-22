import React from 'react';
import './OurVision.css';
import Header from '../public/Header';
import Footer from '../public/Footer';

const OurVision = () => {
  return (
    <>
      <Header />
      <div className="vision-section">
        <h2 className="vision-title">Our Vision</h2>
        <div className="vision-content">
          <div className="vision-item">
            <h3>Connecting People</h3>
            <p>We envision a world where everyone has the opportunity to build meaningful connections through real-world events.</p>
          </div>
          <div className="vision-item">
            <h3>Empowering Communities</h3>
            <p>By providing tools and support, we aim to empower individuals to create and grow thriving communities.</p>
          </div>
          <div className="vision-item">
            <h3>Inclusive and Diverse</h3>
            <p>Our platform is built to welcome all backgrounds, celebrating diversity and promoting inclusive engagement.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OurVision;
