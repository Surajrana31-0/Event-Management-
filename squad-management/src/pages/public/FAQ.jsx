import React, { useState } from 'react';
import './FAQ.css';
import Header from '../public/Header';
import Footer from '../public/Footer';

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <h3 className="faq-question">{question}</h3>
      {open && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  return (
    <>
      <Header />
      <div className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          <FAQItem
            question="How do I create an event?"
            answer="Simply click on 'Create Event', fill in the details, and publish your event in just a few clicks."
          />
          <FAQItem
            question="Can I attend events without an account?"
            answer="You can view public events, but you’ll need to sign up to RSVP, join communities, or create events."
          />
          <FAQItem
            question="Is SquadEvent free to use?"
            answer="Yes! Our basic features are free. We also offer premium tools for professional organizers."
          />
          <FAQItem
            question="How do I join a community?"
            answer="Search or browse communities by interest, and click 'Join' to become a part of one."
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
