import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { makeDraggable, handleSubscribe, handleBooking } from '../scripts/script';
import '../styles/style.css';

function Home() {
  const categoriesRef = useRef(null);
  const eventsRef = useRef(null);
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Make sections draggable
    if (categoriesRef.current) makeDraggable(categoriesRef.current);
    if (eventsRef.current) makeDraggable(eventsRef.current);
  }, []);

  const handleSubscribeClick = () => {
    if (handleSubscribe(email)) {
      setEmail('');
    }
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchTerm);
    // You can also redirect to a search results page or filter events based on the searchTerm
  };

  

  return (
    <>
      <header>
        <div className="navbar">
          <div className="logo-search">
            <div className="logo">Squad Event</div>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <button onClick={handleSearch} className="search-btn">
                Search
              </button>
            </div>
          </div>
          <nav>
            <a href="#categories">Find Events</a>
            <a href="#contact-section">Contact</a>
            <a href="#help-section">Help Centre</a>
            <Link to="/login" className='login-btn'>Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <img src="/images/hero.jpeg" alt="Hero Banner" className="hero-img" />
        <div className="hero-text">
          <h1>Purna Rai and Darshan Rai</h1>
          <p>Australia Tour 2024<br />June/July</p>
          <button onClick={handleBooking}>Book Now</button>
        </div>
      </section>

      <section className="categories" id="categories" ref={categoriesRef}>
        <h2>Categories</h2>
        <div className="category-list">
          <div className="category"><img src="/images/music.jpeg" alt="Music" /><p>Music</p></div>
          <div className="category"><img src="/images/business.jpeg" alt="Business" /><p>Business</p></div>
          <div className="category"><img src="/images/nightlife.jpeg" alt="Nightlife" /><p>Nightlife</p></div>
          <div className="category"><img src="/images/holidays.jpeg" alt="Holiday" /><p>Holiday</p></div>
          <div className="category"><img src="/images/food and drink.jpeg" alt="Food & Drink" /><p>Food & Drink</p></div>
          <div className="category"><img src="/images/education.jpeg" alt="Education" /><p>Education</p></div>
          <div className="category"><img src="/images/sports.jpeg" alt="Gaming" /><p>Gaming</p></div>
          <div className="category"><img src="/images/tech.jpeg" alt="Technology" /><p>Technology</p></div>
          <div className="category"><img src="/images/Health.jpeg" alt="Health" /><p>Health</p></div>
        </div>
      </section>

      <section className="events" ref={eventsRef}>
        <h2>More Events</h2>
        <div className="event-cards">
          <div className="event-card">
            <img src="/images/danceprogram.jpeg" alt="Dance Program" />
            <h3>Let Your Soul Travel</h3>
            <p>Sydney, NSW</p>
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
          </div>

          <div className="event-card">
            <img src="/images/cocktailnight.jpeg" alt="Cocktail Party" />
            <h3>Cuber Expo</h3>
            <p>Adelaide, SA</p>
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
          </div>

          <div className="event-card">
            <img src="/images/cocktailnight.jpeg" alt="Cocktail Party" />
            <h3>Cuber Expo</h3>
            <p>Adelaide, SA</p>
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
          </div>

          <div className="event-card">
            <img src="/images/art program.jpeg" alt="The Magic of Art" />
            <h3>Learn in a New Way</h3>
            <p>Melbourne, VIC</p>
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
          </div>

          <div className="event-card">
            <img src="/images/footballmatch.jpeg" alt="Football Match" />
            <h3>The Magic of Art</h3>
            <p>Brisbane, QLD</p>
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
          </div>

          <div className="event-card">
            <img src="/images/health checkup.jpeg" alt="Health Checkup Camp" />
            <h3>Night Music Festival</h3>
            <p>Perth, WA</p>
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
          </div>

          <div className="event-card">
            <img src="/images/tech.jpeg" alt="Tech Future Expo" />
            <h3>Tech Future Expo</h3>
            <p>Canberra, ACT</p>
            <button onClick={handleBooking} className="book-now-btn">Book Now</button>
          </div>
        </div>
      </section>

      <section className="testimonials" id="help-section">
        <h2>What people said...</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <img src="/images/woman.jpeg" alt="Smiling Woman" />
            <h4>Jane Doe</h4>
            <p>"The best experience I've had!"</p>
          </div>
          <div className="testimonial">
            <img src="/images/man.jpeg" alt="Confident Man" />
            <h4>John Smith</h4>
            <p>"Very well organized events."</p>
          </div>
          <div className="testimonial">
            <img src="/images/configent.jpeg" alt="Confident Woman" />
            <h4>Emma Watson</h4>
            <p>"Absolutely amazing and seamless!"</p>
          </div>
          <div className="testimonial">
            <img src="/images/happy.jpeg" alt="Happy Man" />
            <h4>Daniel Ray</h4>
            <p>"Loved the atmosphere and people."</p>
          </div>
        </div>
      </section>

      <footer id="contact-section">
        <div className="footer-columns">
          <div>
            <h4>About Us</h4>
            <p>SQuad Events connects communities through unforgettable live experiences.</p>
            <p><a href="#">Careers</a></p>
            <p><a href="#">Privacy Policy</a></p>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:support@squadevents.com">support@squadevents.com</a></p>
            <p><a href="https://www.facebook.com/squadevents" target="_blank" rel="noopener noreferrer">Facebook</a></p>
            <p><a href="https://www.instagram.com/squadevents" target="_blank" rel="noopener noreferrer">Instagram</a></p>
          </div>
          <div>
            <h4>Help & Support</h4>
            <p><a href="#">FAQs</a></p>
            <p><a href="#">Support Community</a></p>
            <p><a href="#">User  Guide</a></p>
          </div>
          <div>
            <h4>Subscribe</h4>
            <p>Get the latest updates on events, offers, and more.</p>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribeClick}>Submit</button>
          </div>
        </div>
        <p className="copyright">© 2025 SQuad Events. All rights reserved. Designed with ❤️ in Australia.</p>
      </footer>
    </>
  );
}

export default Home;
