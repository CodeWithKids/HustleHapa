import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaSearch, FaFilter } from 'react-icons/fa'
import JobCard from '../components/JobCard'
import { fetchJobs } from '../services/jobService'
import './JobListings.css'

const jobTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'mjengo', label: 'Construction' },
  { value: 'babysitting', label: 'Babysitting' },
  { value: 'laundry', label: 'Laundry' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'cleaning', label: 'Cleaning' }
]

const JobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all')
  const [locationFilter, setLocationFilter] = useState('')

  useEffect(() => {
    loadJobs()
  }, [])

  // Update filters when URL params change
  useEffect(() => {
    const searchParam = searchParams.get('search')
    const typeParam = searchParams.get('type')
    if (searchParam) setSearchQuery(searchParam)
    if (typeParam) setSelectedType(typeParam)
  }, [searchParams])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchQuery, selectedType, locationFilter])

  const loadJobs = async () => {
    setLoading(true)
    try {
      const fetchedJobs = await fetchJobs()
      setJobs(fetchedJobs)
      setFilteredJobs(fetchedJobs)
    } catch (error) {
      console.error('Failed to load jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = [...jobs]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.employer.toLowerCase().includes(query) ||
          job.requiredSkills.some(skill => skill.toLowerCase().includes(query))
      )
    }

    // Filter by job type
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType)
    }

    // Filter by location
    if (locationFilter.trim()) {
      const location = locationFilter.toLowerCase()
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location)
      )
    }

    setFilteredJobs(filtered)
  }

  const handleApply = () => {
    // Reload jobs to update application status
    loadJobs()
  }

  if (loading) {
    return (
      <div className="job-listings-container">
        <div className="container">
          <div className="loading">Loading jobs...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="job-listings-container">
      <div className="container">
        <div className="job-listings-header">
          <h1 className="page-title">Job Listings</h1>
          <p className="page-subtitle">
            Find your next opportunity in the community
          </p>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <FaSearch className="search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search jobs, skills, or employers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search jobs"
            />
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="location-filter" className="filter-label">
                <FaFilter aria-hidden="true" />
                Location
              </label>
              <input
                id="location-filter"
                type="text"
                placeholder="e.g., Nairobi"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="filter-input"
                aria-label="Filter by location"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="type-filter" className="filter-label">
                <FaFilter aria-hidden="true" />
                Job Type
              </label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="filter-select"
                aria-label="Filter by job type"
              >
                {jobTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="results-info">
          <p>
            Showing <strong>{filteredJobs.length}</strong> job{filteredJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="no-jobs">
            <p>No jobs found matching your criteria.</p>
            <p>Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JobListings
