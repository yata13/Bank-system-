import './App.css';
import './components/login.css';
import { Link } from 'react-router-dom';

import museum from './assets/museum.png';
import customer from './assets/customer.png';
import partner from './assets/partner.png';
import transaction from './assets/transaction.png';
import CountUp from './components/countUp.jsx';
import phone from './assets/phone-screen.png';
import atm from './assets/atm.png';

import america from './countrys/america.png';
import china from './countrys/china.png';
import europe from './countrys/europe.jpg';
import japan from './countrys/japan.png';
import uk from './countrys/united-kingdom.png';
import united from './countrys/united.png';
import canada from './countrys/canada.png';
import saudi from './countrys/saudi-arabia.png';

import xybery from './assets/xybery.png';
import gold from './assets/gold.png';

export default function App() {
  return (
    <>
      <div className="homepage">
        <header className="navbar">
          <div className="logo">
            <img className='bank-logo' src={museum} alt="logo" />
            Xybery
          </div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/" className="links">Home</Link></li>
              <li><Link to="/technology" className="links">Technology</Link></li>
              <li><Link to="/EmployeeLogin" className="links">Employees</Link></li>
              <li><Link to="/contact" className="links">Contact Us</Link></li>
              <li><Link to="/faq" className="links">FAQ</Link></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <Link to="/EmployeeLogin" className="login">Log in</Link>
            <button className="signup">Sign Up</button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-content">
            <div className="badge">● Manage Your Finances</div>
            <h1>Finance That Grows with <br /> Your Ambition</h1>
            <p>
              Unlock powerful tools to manage, track, and scale your finances seamlessly. <br />
              Designed to support your goals at every stage of growth.
            </p>
            <div className="cta-buttons">
              <button className="primary">Get Started Free</button>
              <button className="secondary">▶ Watch Demo</button>
            </div>
          </div>
        </section>
      </div>

    <section className='Exchange'>
        <div className='table-div'>
          <h1>Transaction</h1>
          <h6>Today, 4 March</h6>
          <table className='custom-table'>
            <thead>
              <tr>
                <th className='time-col'>Time</th>
                <th className='currency-col'>Currency</th>
                <th className='cash-buy'>Cash Buying</th>
                <th className='cash-sell'>Cash Selling</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:29</td>
                <td><img className='currency-img' src={america} /> USD</td>
                <td>134.1388</td>
                <td>131.5086</td>
              </tr>
              <tr>
                <td>09:43</td>
                <td><img className='currency-img' src={uk} /> GBP</td>
                <td>174.4955</td>
                <td>177.9854</td>
              </tr>
              <tr>
                <td>23:08</td>
                <td><img className='currency-img' src={europe} /> EUR</td>
                <td>149.8277</td>
                <td>152.8243</td>
              </tr>
              <tr>
                <td>11:15</td>
                <td><img className='currency-img' src={china} /> CNY</td>
                <td>19.2789</td>
                <td>20.3011</td>
              </tr>
              <tr>
                <td>08:30</td>
                <td><img className='currency-img' src={japan} /> JPY</td>
                <td>00.9215</td>
                <td>00.9432</td>
              </tr>
              <tr>
                <td>07:50</td>
                <td><img className='currency-img' src={united} /> AED</td>
                <td>36.5123</td>
                <td>37.1088</td>
              </tr>
              <tr>
                <td>06:45</td>
                <td><img className='currency-img' src={saudi} /> SAR</td>
                <td>35.9087</td>
                <td>36.4075</td>
              </tr>
              <tr>
                <td>06:00</td>
                <td><img className='currency-img' src={canada} /> CAD</td>
                <td>99.1278</td>
                <td>101.398</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='exchange-phone'>
          <img class="phone-screen" src={phone} alt="Museum Icon" />
          <div className='insert'>
          </div>
        </div>
      </section>

    <div className='our-customer'>
      <div className='our-div'>
        <img src={museum} alt="Museum Icon" />
        <h3>Branch <CountUp end={234} suffix="+" /></h3>
      </div>
      <div className='our-div'>
        <img src={customer} alt="Group Icon" />
        <h3>Customer <CountUp start={1000000} end={2000000} suffix="+" /></h3>
      </div>
      <div className='our-div'>
        <img src={partner} alt="Partner Icon" />
        <h3>Partners <CountUp end={20000} suffix="+" /></h3>
      </div>
      <div className='our-div'>
        <img src={transaction} alt="Transaction Icon" />
        <h4>Transaction Per <br /> Month <CountUp end={150000000} suffix="+" /></h4>
      </div>
    </div>

    <img className='atm-mashin' src={atm}/>

    <section className='atm-card'>
        <div className='cards'>
           <div className='card xybery'>
              <img className='card-img' src={xybery}/>
              <div>
                <h2>Xybery Classic card</h2>
                <p className='card-p'>The everyday essential. The Classic Debit Card gives you solid purchasing power and access to mobile & ATM services — up to ETB 200,000 per day. Simple, safe, reliable</p>
              </div>
            </div>
            <div className='card gold'>
              <img className='card-img' src={gold}/>
              <div>
                <h2>Xybery Puls card</h2>
                <p className='card-p'>Built for progress. The gold Card is perfect for professionals, offering powerful purchasing limits, international access, and digital rewards. Secure, smart, and built for your daily success.</p>
              </div>
            </div>
        </div>
        {/* <div className='master'> 
          <img className='master-img' src={}/>
            <p>XYBERY master CARD</p>
            <p>As a core client of XYBERY, your success is our priority. The Gold Debit Card grants you unmatched power — premium service access, high-limit purchases, and elite status. Unlock global flexibility with confidence.</p>
        </div> */}
      </section>

 <h1 className='news-title'>Latest <span className='news-title-span'>News</span></h1>
  <section className='latest-news'>
    {[...Array(8)].map((_, i) => (
      <div key={i} className='news-card'>
        <img className='news-img' src={atm} alt="news image" />
        <div className="news-content">
          <h2 className="news-header">News Header</h2>
          <p className='news-paragraph'>This is a short paragraph describing the news content.</p>
        </div>
      </div>
    ))}
  </section>


      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-text">
          <h2 className="newsletter-heading">Get Our News And Updates</h2>
          <p className="newsletter-subtext">Subscribe to stay in the loop.</p>
        </div>

        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" className="newsletter-input" />
          <input type="text" placeholder="Your text" className="newsletter-input" />
          <button type="submit" className="newsletter-button">Subscribe</button>
        </form>
      </div>

      <hr />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="logo">LOGO</div>
            <p>Empowering Your Projects, <br /> Enhancing Your Success, Every <br /> Step of the Way.</p>
            <div className="social-icons">
              <i className="fab fa-facebook-f" />
              <i className="fab fa-linkedin-in" />
              <i className="fab fa-instagram" />
              <i className="fab fa-twitter" />
            </div>
          </div>

          <div className="footer-column">
            <h4>Home</h4>
            <ul>
              <li>Product Features</li>
              <li>Benefits</li>
              <li>How To Use</li>
              <li>Key Features</li>
              <li>Pricing</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li>Mobile App</li>
              <li>Desktop App</li>
              <li>How To Use</li>
              <li>Testimonials</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>All Pages</h4>
            <ul>
              <li>Home</li>
              <li>App</li>
              <li>Blogs</li>
              <li>Blog Open</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Download our App</h4>
            <button className="store-btn">▶ Get it on Google Play</button>
            <button className="store-btn"> Download on the App Store</button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Euphoria. All rights reserved.</p>
          <div>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Services</a>
          </div>
        </div>
      </footer>
    </>
  );
}
