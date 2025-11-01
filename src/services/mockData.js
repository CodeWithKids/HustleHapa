// Mock data for jobs, applications, and ratings

export const mockJobs = [
  {
    id: 1,
    title: 'Mjengo Helper Needed',
    employer: 'Construction Co.',
    employerId: 2,
    location: 'Nairobi, Westlands',
    type: 'mjengo',
    pay: 'KES 800/day',
    rate: 800,
    description: 'Looking for a reliable helper for construction work. Experience preferred.',
    requiredSkills: ['Physical strength', 'Basic construction knowledge'],
    datePosted: '2024-01-15',
    status: 'open',
    applicants: []
  },
  {
    id: 2,
    title: 'Babysitting for Weekend',
    employer: 'Sarah Johnson',
    employerId: 2,
    location: 'Nairobi, Karen',
    type: 'babysitting',
    pay: 'KES 1,500/day',
    rate: 1500,
    description: 'Need a caring babysitter for my 5-year-old daughter this weekend.',
    requiredSkills: ['Childcare experience', 'First aid knowledge', 'Patience'],
    datePosted: '2024-01-14',
    status: 'open',
    applicants: []
  },
  {
    id: 3,
    title: 'Laundry Service',
    employer: 'Hotel Services Ltd',
    employerId: 2,
    location: 'Nairobi, City Center',
    type: 'laundry',
    pay: 'KES 500/day',
    rate: 500,
    description: 'Seeking someone to help with laundry services at our facility.',
    requiredSkills: ['Attention to detail', 'Time management'],
    datePosted: '2024-01-13',
    status: 'open',
    applicants: []
  },
  {
    id: 4,
    title: 'Carpentry Assistant',
    employer: 'Woodworks Kenya',
    employerId: 2,
    location: 'Nairobi, Industrial Area',
    type: 'carpentry',
    pay: 'KES 1,200/day',
    rate: 1200,
    description: 'Experienced carpenter needed for furniture making workshop.',
    requiredSkills: ['Carpentry skills', 'Tool knowledge', 'Precision'],
    datePosted: '2024-01-12',
    status: 'open',
    applicants: []
  },
  {
    id: 5,
    title: 'Gardening Services',
    employer: 'Green Thumb Estates',
    employerId: 2,
    location: 'Nairobi, Lavington',
    type: 'gardening',
    pay: 'KES 700/day',
    rate: 700,
    description: 'Looking for a gardener to maintain residential garden.',
    requiredSkills: ['Gardening knowledge', 'Physical fitness', 'Plant care'],
    datePosted: '2024-01-11',
    status: 'open',
    applicants: []
  },
  {
    id: 6,
    title: 'Cleaning Services',
    employer: 'Clean Home Services',
    employerId: 2,
    location: 'Nairobi, Parklands',
    type: 'cleaning',
    pay: 'KES 600/day',
    rate: 600,
    description: 'Part-time cleaning assistant needed for office spaces.',
    requiredSkills: ['Cleaning experience', 'Reliability'],
    datePosted: '2024-01-10',
    status: 'open',
    applicants: []
  }
]

export const mockApplications = [
  {
    id: 1,
    jobId: 1,
    userId: 1,
    userName: 'John Doe',
    userEmail: 'user@example.com',
    appliedDate: '2024-01-14',
    status: 'pending',
    jobTitle: 'Mjengo Helper Needed'
  },
  {
    id: 2,
    jobId: 2,
    userId: 1,
    userName: 'John Doe',
    userEmail: 'user@example.com',
    appliedDate: '2024-01-13',
    status: 'accepted',
    jobTitle: 'Babysitting for Weekend',
    jobDate: '2024-01-20'
  }
]

export const mockRatings = [
  {
    id: 1,
    userId: 1,
    jobId: 2,
    jobTitle: 'Babysitting for Weekend',
    rating: 5,
    comment: 'Excellent work! Very reliable and caring.',
    date: '2024-01-18',
    fromEmployer: 'Sarah Johnson'
  }
]

// Helper functions to work with localStorage for persistence
export const getStoredJobs = () => {
  const stored = localStorage.getItem('hustleHapaJobs')
  return stored ? JSON.parse(stored) : mockJobs
}

export const saveJobs = (jobs) => {
  localStorage.setItem('hustleHapaJobs', JSON.stringify(jobs))
}

export const getStoredApplications = () => {
  const stored = localStorage.getItem('hustleHapaApplications')
  return stored ? JSON.parse(stored) : mockApplications
}

export const saveApplications = (applications) => {
  localStorage.setItem('hustleHapaApplications', JSON.stringify(applications))
}

export const getStoredRatings = () => {
  const stored = localStorage.getItem('hustleHapaRatings')
  return stored ? JSON.parse(stored) : mockRatings
}

export const saveRatings = (ratings) => {
  localStorage.setItem('hustleHapaRatings', JSON.stringify(ratings))
}
