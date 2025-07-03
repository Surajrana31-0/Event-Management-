import React from 'react';
import './Feature.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Feature = () => {
  return (
    <>
    <Header />
    <div className="feature-section">
      <h2 className="feature-title">Platform Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Event Discovery</h3>
          <p>Find local and global events that match your interests using our smart discovery engine.</p>
        </div>
        <div className="feature-item">
          <h3>Easy Event Creation</h3>
          <p>Organize your own meetups with just a few clicks and reach a like-minded audience.</p>
        </div>
        <div className="feature-item">
          <h3>Community Driven</h3>
          <p>Join or form communities based on shared hobbies, causes, and passions.</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Feature;
