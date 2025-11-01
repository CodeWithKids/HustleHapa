import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  getEmployerJobs,
  getJobApplications,
  updateApplicationStatus,
  postJob
} from '../services/jobService'
import { getStoredJobs } from '../services/mockData'
import Rating from '../components/Rating'
import {
  FaPlus,
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaEye,
  FaStar,
  FaChartBar,
  FaEdit,
  FaTrash
} from 'react-icons/fa'
import './Dashboard.css'

const EmployerDashboard = () => {
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState({})
  const [loading, setLoading] = useState(true)
  const [showPostForm, setShowPostForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [ratingData, setRatingData] = useState({ rating: 0, comment: '' })
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showJobDateModal, setShowJobDateModal] = useState(false)
  const [jobDate, setJobDate] = useState('')

  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    type: 'mjengo',
    pay: '',
    rate: '',
    description: '',
    requiredSkills: ''
  })

  // Calculate statistics
  const totalJobs = jobs.length
  const totalApplications = Object.values(applications).reduce((sum, apps) => sum + apps.length, 0)
  const pendingApplications = Object.values(applications).flat().filter(app => app.status === 'pending').length
  const acceptedApplications = Object.values(applications).flat().filter(app => app.status === 'accepted').length

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const employerJobs = await getEmployerJobs(user.id)
      setJobs(employerJobs)

      // Load applications for each job
      const appsObj = {}
      for (const job of employerJobs) {
        const jobApps = await getJobApplications(job.id)
        appsObj[job.id] = jobApps
      }
      setApplications(appsObj)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePostJob = async (e) => {
    e.preventDefault()
    const jobData = {
      ...newJob,
      employer: user.name,
      employerId: user.id,
      rate: parseFloat(newJob.rate) || 0,
      requiredSkills: newJob.requiredSkills.split(',').map(s => s.trim()).filter(s => s)
    }

    const result = await postJob(jobData)
    if (result.success) {
      alert('Job posted successfully!')
      setShowPostForm(false)
      setNewJob({
        title: '',
        location: '',
        type: 'mjengo',
        pay: '',
        rate: '',
        description: '',
        requiredSkills: ''
      })
      loadData()
    } else {
      alert('Failed to post job')
    }
  }

  const handleApplicationAction = async (applicationId, status, jobId, application) => {
    if (status === 'accepted') {
      setSelectedApplication({ id: applicationId, jobId, application })
      setShowJobDateModal(true)
      return
    }

    const result = await updateApplicationStatus(applicationId, status, null)
    if (result.success) {
      alert(`Application ${status} successfully!`)
      loadData()
    } else {
      alert('Failed to update application')
    }
  }

  const handleConfirmAccept = async () => {
    if (!jobDate) {
      alert('Please select a job date')
      return
    }

    const result = await updateApplicationStatus(selectedApplication.id, 'accepted', jobDate)
    if (result.success) {
      alert('Application accepted successfully!')
      setShowJobDateModal(false)
      setJobDate('')
      setSelectedApplication(null)
      loadData()
    } else {
      alert('Failed to accept application')
    }
  }

  const handleRateJob = async () => {
    if (ratingData.rating === 0) {
      alert('Please select a rating')
      return
    }

    const ratings = JSON.parse(localStorage.getItem('hustleHapaRatings') || '[]')
    const jobApps = applications[selectedJob.id] || []
    const completedApp = jobApps.find(app => app.status === 'accepted')

    if (!completedApp) {
      alert('No completed application found for this job')
      return
    }

    const newRating = {
      id: Date.now(),
      userId: completedApp.userId,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      rating: ratingData.rating,
      comment: ratingData.comment,
      date: new Date().toISOString().split('T')[0],
      fromEmployer: user.name
    }

    ratings.push(newRating)
    localStorage.setItem('hustleHapaRatings', JSON.stringify(ratings))

    // Update user rating
    const storedUser = JSON.parse(localStorage.getItem('hustleHapaUser') || '{}')
    const allUserRatings = ratings.filter(r => r.userId === completedApp.userId)
    if (allUserRatings.length > 0) {
      const avgRating = allUserRatings.reduce((sum, r) => sum + r.rating, 0) / allUserRatings.length
      storedUser.rating = avgRating
      localStorage.setItem('hustleHapaUser', JSON.stringify(storedUser))
    }

    alert('Rating submitted successfully!')
    setShowRatingForm(false)
    setSelectedJob(null)
    setRatingData({ rating: 0, comment: '' })
  }

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
            <p className="page-subtitle">Manage your job postings and applicants</p>
          </div>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="btn btn-action"
          >
            <FaPlus aria-hidden="true" />
            <span>Post New Job</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-jobs">
              <FaBriefcase className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalJobs}</div>
              <div className="stat-label">Active Jobs</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-applications">
              <FaUsers className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalApplications}</div>
              <div className="stat-label">Total Applications</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-pending">
              <FaClock className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-number">{pendingApplications}</div>
              <div className="stat-label">Pending Review</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-accepted">
              <FaCheckCircle className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-number">{acceptedApplications}</div>
              <div className="stat-label">Accepted Jobs</div>
            </div>
          </div>
        </div>

        {showPostForm && (
          <div className="post-job-form card">
            <div className="form-header">
              <h2 className="form-title">
                <FaPlus aria-hidden="true" /> Post a New Job
              </h2>
              <p className="form-subtitle">Fill in the details below to post your job opportunity</p>
            </div>
            <form onSubmit={handlePostJob}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Job Title</label>
                  <input
                    id="title"
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    id="location"
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="form-input"
                    placeholder="e.g., Nairobi, Westlands"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type" className="form-label">Job Type</label>
                  <select
                    id="type"
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    className="form-input"
                    required
                  >
                    <option value="mjengo">Construction</option>
                    <option value="babysitting">Babysitting</option>
                    <option value="laundry">Laundry</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="gardening">Gardening</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="rate" className="form-label">Pay Rate (KES)</label>
                  <input
                    id="rate"
                    type="number"
                    value={newJob.rate}
                    onChange={(e) => {
                      const rate = e.target.value
                      setNewJob({
                        ...newJob,
                        rate,
                        pay: rate ? `KES ${parseInt(rate).toLocaleString()}/day` : ''
                      })
                    }}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="form-textarea"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="skills" className="form-label">
                  Required Skills (comma-separated)
                </label>
                <input
                  id="skills"
                  type="text"
                  value={newJob.requiredSkills}
                  onChange={(e) => setNewJob({ ...newJob, requiredSkills: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Physical strength, Basic knowledge"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-action">
                  <FaPlus aria-hidden="true" /> Post Job
                </button>
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="jobs-section">
          <h2 className="section-title">Your Job Postings ({jobs.length})</h2>
          {jobs.length === 0 ? (
            <div className="empty-state">
              <p>No jobs posted yet</p>
              <p className="empty-hint">Post your first job to get started</p>
            </div>
          ) : (
            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job.id} className="job-post-card card">
                  <div className="job-post-header">
                    <div className="job-post-title-section">
                      <h3 className="job-post-title">{job.title}</h3>
                      <p className="job-post-meta">
                        Posted on {new Date(job.datePosted).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`badge ${job.status === 'open' ? 'badge-success' : 'badge-warning'}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                  <div className="job-post-details">
                    <span className="job-detail">
                      <FaMapMarkerAlt aria-hidden="true" /> {job.location}
                    </span>
                    <span className="job-detail">
                      <FaDollarSign aria-hidden="true" /> {job.pay}
                    </span>
                    {job.requiredSkills && job.requiredSkills.length > 0 && (
                      <span className="job-detail">
                        <FaBriefcase aria-hidden="true" /> {job.requiredSkills.length} skill{job.requiredSkills.length !== 1 ? 's' : ''} required
                      </span>
                    )}
                  </div>
                  <p className="job-post-description">{job.description}</p>
                  {job.requiredSkills && job.requiredSkills.length > 0 && (
                    <div className="job-post-skills">
                      <span className="skills-label-small">Required Skills:</span>
                      <div className="skills-list-small">
                        {job.requiredSkills.map((skill, idx) => (
                          <span key={idx} className="skill-tag-small">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="applications-section">
                    <h4 className="applications-title">
                      <FaUsers aria-hidden="true" /> Applicants (
                      {applications[job.id]?.length || 0})
                    </h4>
                    {applications[job.id] && applications[job.id].length > 0 ? (
                      <div className="applications-list">
                        {/* Pending Applications First */}
                        {applications[job.id]
                          .filter(app => app.status === 'pending')
                          .map(app => (
                          <div key={app.id} className="application-item application-item-pending">
                            <div className="application-info">
                              <div>
                                <strong>{app.userName}</strong>
                                <p className="application-email">{app.userEmail}</p>
                              </div>
                              <span className={`application-status badge ${
                                app.status === 'accepted' ? 'badge-success' : 
                                app.status === 'rejected' ? 'badge-primary' : 
                                'badge-warning'
                              }`}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </div>
                            <p className="application-date">
                              Applied: {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                            <div className="application-actions">
                              <button
                                onClick={() => handleApplicationAction(app.id, 'accepted', job.id, app)}
                                className="btn btn-secondary btn-sm"
                              >
                                <FaCheckCircle aria-hidden="true" /> Accept
                              </button>
                              <button
                                onClick={() => handleApplicationAction(app.id, 'rejected', job.id, app)}
                                className="btn btn-outline btn-sm"
                              >
                                <FaTimesCircle aria-hidden="true" /> Reject
                              </button>
                            </div>
                          </div>
                        ))}
                        {/* Accepted Applications */}
                        {applications[job.id]
                          .filter(app => app.status === 'accepted')
                          .map(app => (
                          <div key={app.id} className="application-item application-item-accepted">
                            <div className="application-info">
                              <div>
                                <strong>{app.userName}</strong>
                                <p className="application-email">{app.userEmail}</p>
                              </div>
                              <span className={`application-status badge badge-success`}>
                                Accepted
                              </span>
                            </div>
                            <p className="application-date">
                              Applied: {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                            {app.jobDate && (
                              <p className="application-job-date">
                                <FaCalendar aria-hidden="true" /> Job Date: {new Date(app.jobDate).toLocaleDateString()}
                              </p>
                            )}
                            <button
                              onClick={() => {
                                setSelectedJob({ ...job, workerName: app.userName })
                                setShowRatingForm(true)
                              }}
                              className="btn btn-outline btn-sm"
                            >
                              <FaStar aria-hidden="true" /> Rate {app.userName}
                            </button>
                          </div>
                        ))}
                        {/* Rejected Applications */}
                        {applications[job.id]
                          .filter(app => app.status === 'rejected')
                          .map(app => (
                          <div key={app.id} className="application-item application-item-rejected">
                            <div className="application-info">
                              <div>
                                <strong>{app.userName}</strong>
                                <p className="application-email">{app.userEmail}</p>
                              </div>
                              <span className="application-status badge badge-primary">
                                Rejected
                              </span>
                            </div>
                            <p className="application-date">
                              Applied: {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-applicants-container">
                        <FaUsers className="no-applicants-icon" />
                        <p className="no-applicants">No applicants yet</p>
                        <p className="no-applicants-hint">Share your job posting to get more applicants</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Date Modal */}
        {showJobDateModal && selectedApplication && (
          <div className="rating-modal">
            <div className="rating-modal-content card">
              <h2 className="form-title">Accept Application</h2>
              <p className="rating-job-name">
                Accepting application from: <strong>{selectedApplication.application?.userName}</strong>
              </p>
              <div className="form-group">
                <label htmlFor="job-date" className="form-label">
                  <FaCalendar aria-hidden="true" /> Job Date
                </label>
                <input
                  id="job-date"
                  type="date"
                  value={jobDate}
                  onChange={(e) => setJobDate(e.target.value)}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <small className="form-hint">Select the date when the job will be performed</small>
              </div>
              <div className="form-actions">
                <button onClick={handleConfirmAccept} className="btn btn-secondary">
                  <FaCheckCircle aria-hidden="true" /> Confirm Accept
                </button>
                <button
                  onClick={() => {
                    setShowJobDateModal(false)
                    setJobDate('')
                    setSelectedApplication(null)
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingForm && selectedJob && (
          <div className="rating-modal">
            <div className="rating-modal-content card">
              <h2 className="form-title">Rate Worker</h2>
              <p className="rating-job-name">
                <strong>Job:</strong> {selectedJob.title}
              </p>
              {selectedJob.workerName && (
                <p className="rating-worker-name">
                  <strong>Worker:</strong> {selectedJob.workerName}
                </p>
              )}
              <div className="form-group">
                <label className="form-label">Rating</label>
                <Rating
                  rating={ratingData.rating}
                  editable={true}
                  onRate={(rating) => setRatingData({ ...ratingData, rating })}
                  size="large"
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment" className="form-label">Comment (Optional)</label>
                <textarea
                  id="comment"
                  value={ratingData.comment}
                  onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })}
                  className="form-textarea"
                  placeholder="Share your experience..."
                  rows="4"
                />
              </div>
              <div className="form-actions">
                <button onClick={handleRateJob} className="btn btn-primary">
                  <FaStar aria-hidden="true" /> Submit Rating
                </button>
                <button
                  onClick={() => {
                    setShowRatingForm(false)
                    setSelectedJob(null)
                    setRatingData({ rating: 0, comment: '' })
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployerDashboard
