import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="footer-icon">💼</span>
              Hustle Hapa
            </h3>
            <p className="footer-description">
              Connecting youth with local job opportunities. Build your skills, earn fair wages, and grow your career.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact">
              <p className="contact-item">
                <FaEnvelope aria-hidden="true" />
                <span>support@hustlehapa.com</span>
              </p>
              <p className="contact-item">
                <FaPhone aria-hidden="true" />
                <span>+254 700 000 000</span>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Hustle Hapa. All rights reserved.</p>
          <p className="footer-tagline">Empowering youth, one job at a time.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
