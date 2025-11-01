import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaTools,
  FaHammer,
  FaBaby,
  FaTshirt,
  FaLeaf,
  FaBroom,
  FaBriefcase
} from 'react-icons/fa'
import { applyToJob } from '../services/jobService'
import './JobCard.css'

const jobTypeIcons = {
  mjengo: <FaHammer />,
  babysitting: <FaBaby />,
  laundry: <FaTshirt />,
  carpentry: <FaTools />,
  gardening: <FaLeaf />,
  cleaning: <FaBroom />
}

const jobTypeLabels = {
  mjengo: 'Construction',
  babysitting: 'Babysitting',
  laundry: 'Laundry',
  carpentry: 'Carpentry',
  gardening: 'Gardening',
  cleaning: 'Cleaning'
}

const JobCard = ({ job, onApply }) => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleApply = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (user.role === 'employer') {
      alert('Employers cannot apply to jobs')
      return
    }

    const result = await applyToJob(job.id, user.id, user.name, user.email)
    if (result.success) {
      alert('Application submitted successfully!')
      if (onApply) onApply()
    } else {
      alert(result.error || 'Failed to apply. You may have already applied.')
    }
  }

  const hasApplied = user && job.applicants?.some(app => app.userId === user.id)

  return (
    <article className="job-card card" aria-label={`Job: ${job.title}`}>
      <div className="job-card-header">
        <div className="job-type-icon" aria-label={jobTypeLabels[job.type] || job.type}>
          {jobTypeIcons[job.type] || <FaBriefcase />}
        </div>
        <div className="job-card-title-section">
          <h3 className="job-title">{job.title}</h3>
          <p className="job-employer">by {job.employer}</p>
        </div>
      </div>

      <div className="job-card-details">
        <div className="job-detail-item" aria-label={`Location: ${job.location}`}>
          <FaMapMarkerAlt className="detail-icon" aria-hidden="true" />
          <span>{job.location}</span>
        </div>
        <div className="job-detail-item" aria-label={`Pay: ${job.pay}`}>
          <FaDollarSign className="detail-icon" aria-hidden="true" />
          <span>{job.pay}</span>
        </div>
        <div className="job-type-badge">
          <span className="badge badge-primary">
            {jobTypeLabels[job.type] || job.type}
          </span>
        </div>
      </div>

      <div className="job-skills">
        <p className="skills-label">Required Skills:</p>
        <div className="skills-list">
          {job.requiredSkills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <p className="job-description">{job.description}</p>

      <div className="job-card-actions">
        <button
          onClick={handleApply}
          className={`btn ${hasApplied ? 'btn-outline' : 'btn-action'}`}
          disabled={hasApplied || user?.role === 'employer'}
          aria-label={hasApplied ? 'Already applied' : `Apply to ${job.title}`}
        >
          {hasApplied ? 'Applied' : 'Apply'}
        </button>
      </div>
    </article>
  )
}

export default JobCard
