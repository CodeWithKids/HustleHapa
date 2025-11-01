import {
  getStoredJobs,
  saveJobs,
  getStoredApplications,
  saveApplications
} from './mockData'

/**
 * Fetch all available jobs
 * @returns {Promise<Array>} Array of job objects
 */
export const fetchJobs = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const jobs = getStoredJobs()
  return jobs.filter(job => job.status === 'open')
}

/**
 * Apply to a job
 * @param {number} jobId - ID of the job
 * @param {number} userId - ID of the user applying
 * @param {string} userName - Name of the user
 * @param {string} userEmail - Email of the user
 * @returns {Promise<Object>} Result object with success status
 */
export const applyToJob = async (jobId, userId, userName, userEmail) => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const jobs = getStoredJobs()
  const job = jobs.find(j => j.id === jobId)

  if (!job) {
    return { success: false, error: 'Job not found' }
  }

  // Check if user already applied
  if (job.applicants?.some(app => app.userId === userId)) {
    return { success: false, error: 'You have already applied to this job' }
  }

  // Add applicant to job
  if (!job.applicants) {
    job.applicants = []
  }
  job.applicants.push({
    userId,
    userName,
    userEmail,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'pending'
  })

  // Save application
  const applications = getStoredApplications()
  applications.push({
    id: Date.now(),
    jobId,
    userId,
    userName,
    userEmail,
    appliedDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    jobTitle: job.title
  })

  saveJobs(jobs)
  saveApplications(applications)

  return { success: true }
}

/**
 * Post a new job (for employers)
 * @param {Object} jobData - Job data object
 * @returns {Promise<Object>} Result object with success status and job
 */
export const postJob = async (jobData) => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const jobs = getStoredJobs()
  const newJob = {
    id: Date.now(),
    ...jobData,
    datePosted: new Date().toISOString().split('T')[0],
    status: 'open',
    applicants: []
  }

  jobs.push(newJob)
  saveJobs(jobs)

  return { success: true, job: newJob }
}

/**
 * Get jobs posted by an employer
 * @param {number} employerId - ID of the employer
 * @returns {Promise<Array>} Array of job objects
 */
export const getEmployerJobs = async (employerId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const jobs = getStoredJobs()
  return jobs.filter(job => job.employerId === employerId)
}

/**
 * Get applications for a specific job
 * @param {number} jobId - ID of the job
 * @returns {Promise<Array>} Array of application objects
 */
export const getJobApplications = async (jobId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const applications = getStoredApplications()
  return applications.filter(app => app.jobId === jobId)
}

/**
 * Update application status
 * @param {number} applicationId - ID of the application
 * @param {string} status - New status (accepted/rejected)
 * @param {string} jobDate - Optional job date for accepted applications
 * @returns {Promise<Object>} Result object
 */
export const updateApplicationStatus = async (applicationId, status, jobDate = null) => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const applications = getStoredApplications()
  const application = applications.find(app => app.id === applicationId)

  if (!application) {
    return { success: false, error: 'Application not found' }
  }

  application.status = status
  if (jobDate) {
    application.jobDate = jobDate
  }

  saveApplications(applications)
  return { success: true }
}

/**
 * Get user's applications
 * @param {number} userId - ID of the user
 * @returns {Promise<Array>} Array of application objects
 */
export const getUserApplications = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const applications = getStoredApplications()
  return applications.filter(app => app.userId === userId)
}
