import { useState, useEffect } from 'react'
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
  FaSmile,
  FaQuoteLeft,
  FaUserPlus,
  FaGraduationCap
} from 'react-icons/fa'
import { jobCategories, getJobCategoryImage } from '../utils/jobCategoryImages'
import { fetchJobs } from '../services/jobService'
import JobCard from '../components/JobCard'
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
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    loadFeaturedJobs()
  }, [])

  const loadFeaturedJobs = async () => {
    try {
      const allJobs = await fetchJobs()
      // Show first 6 jobs
      setJobs(allJobs.slice(0, 6))
    } catch (error) {
      console.error('Failed to load featured jobs:', error)
    }
  }

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
              Find Local Jobs, Build Your Skills, <span className="hero-highlight">Hustle Here!</span>
            </h1>
            <p className="hero-subtitle">
              Connecting youth to local job opportunities like mjengo, babysitting, laundry, carpentry, gardening, and more. 
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

      {/* Featured Job Listings */}
      {jobs.length > 0 && (
        <section className="featured-jobs">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Job Opportunities</h2>
              <p className="section-subtitle">Recent job postings in your area</p>
            </div>
            <div className="featured-jobs-grid">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="view-all-jobs">
              <Link to="/jobs" className="btn btn-outline">
                <span>View All Jobs</span>
                <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple steps to get started on your journey</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaUserPlus className="feature-icon" />
              </div>
              <div className="feature-number">01</div>
              <h3 className="feature-title">Sign Up</h3>
              <p className="feature-description">
                Create your free account in minutes. Choose whether you're looking for jobs or posting them.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaSearch className="feature-icon" />
              </div>
              <div className="feature-number">02</div>
              <h3 className="feature-title">Find Jobs</h3>
              <p className="feature-description">
                Explore local job opportunities in your area. Filter by type, location, and pay rate to find the perfect match.
              </p>
            </div>
            <div className="feature-card feature-card-highlight">
              <div className="feature-icon-wrapper">
                <FaFileAlt className="feature-icon" />
              </div>
              <div className="feature-number">03</div>
              <h3 className="feature-title">Apply</h3>
              <p className="feature-description">
                Apply to jobs with one click. Track your applications and manage your job search all in one place.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaStar className="feature-icon" />
              </div>
              <div className="feature-number">04</div>
              <h3 className="feature-title">Get Rated</h3>
              <p className="feature-description">
                Complete jobs and earn ratings from employers. Build a strong reputation that opens more opportunities.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaGraduationCap className="feature-icon" />
              </div>
              <div className="feature-number">05</div>
              <h3 className="feature-title">Grow Skills</h3>
              <p className="feature-description">
                Access learning resources and tips. Build your skills with every job you complete.
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
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Skill Learning Resources</h4>
                    <p>Access to resources and tips to help you grow your skills</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Quick & Free</h4>
                    <p>No fees, no hassle - sign up and start applying today</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <FaCheckCircle className="benefit-icon" />
                  <div>
                    <h4>Safe for Youth</h4>
                    <p>Verified employers and secure platform for safe job matching</p>
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

      {/* Community Impact Section */}
      <section className="community-impact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Making a Difference in Our Community</h2>
            <p className="section-subtitle">See how Hustle Hapa is empowering youth</p>
          </div>
          <div className="impact-stats">
            <div className="impact-stat">
              <div className="impact-number">500+</div>
              <div className="impact-label">Successful Job Matches</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">200+</div>
              <div className="impact-label">Trusted Workers</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">150+</div>
              <div className="impact-label">Active Employers</div>
            </div>
            <div className="impact-stat">
              <div className="impact-number">4.8★</div>
              <div className="impact-label">Average Rating</div>
            </div>
          </div>
          <div className="testimonials">
            <div className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">
                "Hustle Hapa helped me find reliable work close to home. The rating system built my reputation and now I get more job offers!"
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>John M.</strong>
                  <span>Construction Worker</span>
                </div>
                <div className="author-rating">
                  <FaStar />
                  <span>4.9</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">
                "As an employer, I've found amazing young talent through Hustle Hapa. The platform is easy to use and the workers are reliable."
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>Sarah K.</strong>
                  <span>Employer</span>
                </div>
                <div className="author-rating">
                  <FaStar />
                  <span>5.0</span>
                </div>
              </div>
            </div>
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
