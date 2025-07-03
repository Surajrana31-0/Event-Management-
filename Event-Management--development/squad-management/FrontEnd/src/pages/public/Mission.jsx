import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Mission.css';

const OurMission = () => {
  return (
    <>
      <Header />
      <div className="mission-page">
        <div className="mission-content">
          <h1>Our Mission</h1>
          <p>
            At SquadEvent, our mission is to bridge connections between people through real-world events and shared passions. We believe in building a community that thrives on collaboration, inclusivity, and meaningful interactions.
          </p>
          <p>
            We are dedicated to providing the tools and platform for individuals to create, discover, and participate in local events that align with their interests. From hobby meetups to large-scale community gatherings, we aim to make every experience engaging and accessible.
          </p>
          <p>
            Join us in shaping a world where people don’t just scroll— they connect, share, and grow together.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OurMission;
