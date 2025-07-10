// Importing React and useState hook for state management
import React, { useState } from 'react';

// Importing the CSS file for FAQ styling
import './FAQ.css';

// Importing Header component from the public folder
import Header from '../public/Header';

// Importing Footer component from the public folder
import Footer from '../public/Footer';

// Defining FAQItem component which takes question and answer as props
const FAQItem = ({ question, answer }) => {
  // useState hook to manage open/close state for each FAQ item
  const [open, setOpen] = useState(false);

  return (
    // Wrapper div for each FAQ item; toggles 'open' class when clicked
    <div
      className={`faq-item ${open ? 'open' : ''}`}
      onClick={() => setOpen(!open)} // Toggles open state on click
    >
      {/* Displaying the question */}
      <h3 className="faq-question">{question}</h3>

      {/* Conditionally rendering the answer only if 'open' is true */}
      {open && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

// Defining main FAQ component
const FAQ = () => {
  return (
    <>
      {/* Rendering the Header component */}
      <Header />

      {/* Main FAQ section container */}
      <div className="faq-section">
        {/* FAQ section title */}
        <h2 className="faq-title">Frequently Asked Questions</h2>

        {/* Container for the list of FAQ items */}
        <div className="faq-list">
          {/* Rendering multiple FAQItem components with question and answer props */}
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

      {/* Rendering the Footer component */}
      <Footer />
    </>
  );
};

// Exporting the FAQ component as default export
export default FAQ;
