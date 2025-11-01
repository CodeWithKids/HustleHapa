import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  FaSearch,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaFileAlt,
  FaHandshake,
  FaChartLine,
  FaMapMarkerAlt,
  FaClock,
  FaSmile
} from 'react-icons/fa'
import { jobCategories, getJobCategoryImage } from '../utils/jobCategoryImages'
import './Home.css'

const JobCategoryCard = ({ category }) => {
  const [imageError, setImageError] = useState(false)
  
  const emojiMap = {
    'Mjengo': '🔨',
    'Babysitting': '👶',
    'Laundry': '👕',
    'Carpentry': '🪚',
    'Gardening': '🌱',
    'Cleaning': '🧹'
  }

  return (
    <div className="job-type-card">
      <div className="job-type-icon">
        {!imageError ? (
          <img
            src={getJobCategoryImage(category.name)}
            alt={category.name}
            className="job-category-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="job-category-fallback">
            {emojiMap[category.name] || '💼'}
          </span>
        )}
      </div>
      <h3>{category.name}</h3>
    </div>
  )
}

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaSmile aria-hidden="true" />
              <span>Connecting Youth with Opportunities</span>
            </div>
            <h1 className="hero-title">
              Find Local Jobs in Your <span className="hero-highlight">Community</span>
            </h1>
            <p className="hero-subtitle">
              Connect with employers for mjengo, babysitting, laundry, carpentry, gardening, and more. 
              Build your future, one job at a time.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Active Jobs</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Happy Workers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4.8★</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/jobs" className="btn btn-action hero-btn hero-btn-primary">
                <FaSearch aria-hidden="true" />
                <span>Browse Jobs</span>
              </Link>
              {!user && (
                <Link to="/signup" className="btn btn-outline hero-btn hero-btn-outline">
                  <span>Get Started Free</span>
                  <FaArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get started in three simple steps</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaSearch className="feature-icon" />
              </div>
              <div className="feature-number">01</div>
              <h3 className="feature-title">Browse Jobs</h3>
              <p className="feature-description">
                Explore local job opportunities in your area. Filter by type, location, and pay rate to find the perfect match.
              </p>
            </div>
            <div className="feature-card feature-card-highlight">
              <div className="feature-icon-wrapper">
                <FaFileAlt className="feature-icon" />
              </div>
              <div className="feature-number">02</div>
              <h3 className="feature-title">Apply Easily</h3>
              <p className="feature-description">
                Apply to jobs with one click. Track your applications and manage your job search all in one place.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaChartLine className="feature-icon" />
              </div>
              <div className="feature-number">03</div>
              <h3 className="feature-title">Build Your Reputation</h3>
              <p className="feature-description">
                Complete jobs and earn ratings from employers. Build a strong profile that opens more opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="benefits-title">Why Choose Hustle Hapa?</h2>
              <p className="benefits-subtitle">
                We're committed to connecting you with quality local opportunities
              </p>
              <div className="benefits-list">
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Verified Employers</h4>
                    <p>All employers are verified to ensure safe and fair work environments</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Fair Pay Rates</h4>
                    <p>Competitive pay rates that reflect the value of your work</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Rating System</h4>
                    <p>Build your reputation with ratings from completed jobs</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Easy Application</h4>
                    <p>Quick and simple application process - get started in minutes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="benefits-visual">
              <div className="visual-card">
                <FaMapMarkerAlt className="visual-icon" />
                <h3>Local Focus</h3>
                <p>Jobs in your neighborhood</p>
              </div>
              <div className="visual-card visual-card-alt">
                <FaClock className="visual-icon" />
                <h3>Flexible Hours</h3>
                <p>Work on your schedule</p>
              </div>
              <div className="visual-card">
                <FaHandshake className="visual-icon" />
                <h3>Trusted Platform</h3>
                <p>Secure and reliable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="job-types">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore Job Categories</h2>
            <p className="section-subtitle">Find opportunities in various fields</p>
          </div>
          <div className="job-types-grid">
            {jobCategories.map((category) => (
              <JobCategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      {!user && (
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Get Started?</h2>
              <p className="cta-text">
                Join Hustle Hapa today and start finding jobs in your community.
              </p>
              <Link to="/signup" className="btn btn-primary cta-btn">
                <span>Sign Up Now</span>
                <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
