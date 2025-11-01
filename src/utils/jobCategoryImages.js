/**
 * Maps job category names to their image paths
 * Images should be placed in public/images/job-categories/
 */
export const getJobCategoryImage = (categoryName) => {
  const imageMap = {
    'Mjengo': '/images/job-categories/mjengo.jpg',
    'Babysitting': '/images/job-categories/babysitting.jpg',
    'Laundry': '/images/job-categories/laundry.jpg',
    'Carpentry': '/images/job-categories/carpentry.jpg',
    'Gardening': '/images/job-categories/gardening.jpg',
    'Cleaning': '/images/job-categories/cleaning.jpg'
  }

  return imageMap[categoryName] || '/images/job-categories/default.jpg'
}

/**
 * List of all job categories with their display names
 */
export const jobCategories = [
  { name: 'Mjengo', slug: 'mjengo' },
  { name: 'Babysitting', slug: 'babysitting' },
  { name: 'Laundry', slug: 'laundry' },
  { name: 'Carpentry', slug: 'carpentry' },
  { name: 'Gardening', slug: 'gardening' },
  { name: 'Cleaning', slug: 'cleaning' }
]
