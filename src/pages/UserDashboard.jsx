import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getUserApplications } from '../services/jobService'
import { getStoredRatings } from '../services/mockData'
import Rating from '../components/Rating'
import { FaBriefcase, FaCalendar, FaStar } from 'react-icons/fa'
import './Dashboard.css'

const UserDashboard = () => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const userApps = await getUserApplications(user.id)
      setApplications(userApps)
      const allRatings = getStoredRatings()
      const userRatings = allRatings.filter(r => r.userId === user.id)
      setRatings(userRatings)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const appliedJobs = applications.filter(app => app.status === 'pending')
  const upcomingJobs = applications.filter(app => app.status === 'accepted')
  const completedJobs = applications.filter(app => app.status === 'completed')

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Welcome, {user.name}!</h1>
            <p className="page-subtitle">Manage your job applications and profile</p>
          </div>
          <div className="rating-summary">
            <div className="rating-display">
              <FaStar className="rating-icon" aria-hidden="true" />
              <div>
                <div className="rating-number">{averageRating.toFixed(1)}</div>
                <div className="rating-label">
                  {ratings.length} review{ratings.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <div className="section-header">
              <FaBriefcase className="section-icon" aria-hidden="true" />
              <h2 className="section-title">Applied Jobs</h2>
              <span className="badge badge-primary">{appliedJobs.length}</span>
            </div>
            {appliedJobs.length === 0 ? (
              <div className="empty-state">
                <p>No pending applications</p>
                <p className="empty-hint">Apply to jobs to see them here</p>
              </div>
            ) : (
              <div className="applications-list">
                {appliedJobs.map(app => (
                  <div key={app.id} className="application-card card">
                    <h3 className="application-title">{app.jobTitle}</h3>
                    <p className="application-date">
                      Applied on {new Date(app.appliedDate).toLocaleDateString()}
                    </p>
                    <span className="badge badge-warning">Pending</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <FaCalendar className="section-icon" aria-hidden="true" />
              <h2 className="section-title">Upcoming Jobs</h2>
              <span className="badge badge-success">{upcomingJobs.length}</span>
            </div>
            {upcomingJobs.length === 0 ? (
              <div className="empty-state">
                <p>No upcoming jobs</p>
                <p className="empty-hint">Accepted applications will appear here</p>
              </div>
            ) : (
              <div className="applications-list">
                {upcomingJobs.map(app => (
                  <div key={app.id} className="application-card card">
                    <h3 className="application-title">{app.jobTitle}</h3>
                    {app.jobDate && (
                      <p className="application-date">
                        <FaCalendar aria-hidden="true" />{' '}
                        {new Date(app.jobDate).toLocaleDateString()}
                      </p>
                    )}
                    <span className="badge badge-success">Accepted</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {ratings.length > 0 && (
          <div className="dashboard-section">
            <div className="section-header">
              <FaStar className="section-icon" aria-hidden="true" />
              <h2 className="section-title">Your Ratings</h2>
            </div>
            <div className="ratings-list">
              {ratings.map(rating => (
                <div key={rating.id} className="rating-card card">
                  <div className="rating-card-header">
                    <Rating rating={rating.rating} size="medium" />
                    <span className="rating-date">
                      {new Date(rating.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="rating-job">{rating.jobTitle || 'Completed Job'}</p>
                  {rating.comment && (
                    <p className="rating-comment">"{rating.comment}"</p>
                  )}
                  <p className="rating-employer">From: {rating.fromEmployer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
