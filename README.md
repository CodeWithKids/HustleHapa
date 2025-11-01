# Hustle Hapa

A modern React frontend for a community job-matching web application. Connect local youth with employers for various job opportunities including construction (mjengo), babysitting, laundry, carpentry, gardening, and more.

## Features

### Core Functionality

- **Job Listings Page**: Searchable and filterable list of local jobs
- **Job Cards**: Display job details including title, employer, location, type, pay, required skills, and apply functionality
- **User Authentication**: Sign up and login system with role-based access (youth/employer)
- **User Dashboard**: View applied jobs, upcoming jobs, and ratings
- **Employer Dashboard**: Post new jobs, view applicants, and rate completed jobs
- **Rating System**: Post-job feedback with star ratings and comments
- **Responsive Design**: Mobile-first UI that works on all devices

### Technology Stack

- **React 18.2** - UI library
- **React Router 6** - Navigation and routing
- **React Icons** - Icon library
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with CSS variables

## Project Structure

```
HustleHapa/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.jsx   # Main navigation bar
│   │   ├── JobCard.jsx      # Individual job listing card
│   │   ├── Rating.jsx       # Star rating component
│   │   └── *.css           # Component styles
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── JobListings.jsx # Job search and listing page
│   │   ├── Login.jsx       # User login page
│   │   ├── Signup.jsx      # User registration page
│   │   ├── UserDashboard.jsx    # Youth user dashboard
│   │   ├── EmployerDashboard.jsx # Employer dashboard
│   │   └── *.css          # Page styles
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx # Authentication state management
│   ├── services/          # API and data services
│   │   ├── mockData.js    # Sample data and storage helpers
│   │   └── jobService.js  # Job-related API functions
│   ├── App.jsx            # Main app component with routing
│   ├── App.css            # App-level styles
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles and CSS variables
├── public/               # Static assets
│   └── images/
│       └── job-categories/  # Job category images
├── src/
│   ├── utils/            # Utility functions
│   │   └── jobCategoryImages.js  # Job category image helpers
│   └── ...
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed

### Adding Job Category Images

The app uses images for job categories displayed on the home page. To add your own images:

1. Place image files in `public/images/job-categories/` with these names:
   - `mjengo.jpg` (or .png/.webp)
   - `babysitting.jpg`
   - `laundry.jpg`
   - `carpentry.jpg`
   - `gardening.jpg`
   - `cleaning.jpg`

2. **Recommended specifications:**
   - Size: 200x200px to 400x400px (square)
   - Format: JPG, PNG, or WebP
   - File size: Optimized for web (under 100KB recommended)

3. **If images are missing:** The app will automatically fall back to emoji icons.

See `public/images/job-categories/README.md` for more details.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HustleHapa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Component Documentation

### Navigation Component

**Location**: `src/components/Navigation.jsx`

Responsive navigation bar that adapts based on user authentication state:
- Shows login/signup links for unauthenticated users
- Displays dashboard link and logout for authenticated users
- Role-based dashboard routing (user vs employer)

**Props**: None (uses AuthContext)

### JobCard Component

**Location**: `src/components/JobCard.jsx`

Displays individual job information in a card format:
- Job title and employer name
- Location and pay rate
- Job type with icon
- Required skills list
- Apply button (disabled if already applied)

**Props**:
- `job` (Object): Job data object
- `onApply` (Function): Callback when user applies to job

**Job Object Structure**:
```javascript
{
  id: number,
  title: string,
  employer: string,
  employerId: number,
  location: string,
  type: string,
  pay: string,
  rate: number,
  description: string,
  requiredSkills: array,
  datePosted: string,
  status: string,
  applicants: array
}
```

### Rating Component

**Location**: `src/components/Rating.jsx`

Star rating display/input component:
- Visual star rating (1-5 stars)
- Can be editable (for rating input) or display-only
- Supports different sizes (small, medium, large)

**Props**:
- `rating` (number): Current rating value (0-5)
- `editable` (boolean): Whether rating can be edited
- `onRate` (Function): Callback when rating changes (for editable mode)
- `size` (string): Size variant ('small', 'medium', 'large')

### Pages

#### Home Page (`src/pages/Home.jsx`)

Landing page with:
- Hero section with call-to-action
- Feature overview
- Job category showcase
- Sign-up prompt (if not logged in)

#### Job Listings Page (`src/pages/JobListings.jsx`)

Main job browsing interface:
- Search functionality (title, description, skills, employer)
- Filter by location
- Filter by job type
- Grid layout of job cards
- Results counter

#### Login Page (`src/pages/Login.jsx`)

User authentication:
- Email and password input
- Demo credentials display
- Redirects to appropriate dashboard after login

**Demo Credentials**:
- User: `user@example.com` / `password123`
- Employer: `employer@example.com` / `password123`

#### Signup Page (`src/pages/Signup.jsx`)

User registration:
- Name, email, password fields
- Role selection (user/employer)
- Password confirmation
- Redirects to dashboard after signup

#### User Dashboard (`src/pages/UserDashboard.jsx`)

Youth user dashboard showing:
- Overall rating display
- Applied jobs (pending applications)
- Upcoming jobs (accepted applications)
- Past job ratings received

#### Employer Dashboard (`src/pages/EmployerDashboard.jsx`)

Employer interface for:
- Posting new jobs
- Viewing posted jobs
- Managing applicants (accept/reject)
- Rating completed jobs

## Services

### AuthContext (`src/contexts/AuthContext.jsx`)

Manages authentication state throughout the app:
- `user`: Current user object (null if not logged in)
- `login(email, password)`: Authenticate user
- `signup(userData)`: Create new account
- `logout()`: Clear session
- `loading`: Loading state during auth checks

### Job Service (`src/services/jobService.js`)

Mock API functions for job operations:
- `fetchJobs()`: Get all available jobs
- `applyToJob(jobId, userId, userName, userEmail)`: Apply to a job
- `postJob(jobData)`: Create new job posting (employers)
- `getEmployerJobs(employerId)`: Get jobs by employer
- `getJobApplications(jobId)`: Get applicants for a job
- `updateApplicationStatus(applicationId, status, jobDate)`: Accept/reject applications
- `getUserApplications(userId)`: Get user's applications

### Mock Data (`src/services/mockData.js`)

Sample data and localStorage helpers:
- `mockJobs`: Initial job listings
- `mockApplications`: Sample job applications
- `mockRatings`: Sample ratings
- Helper functions for localStorage persistence:
  - `getStoredJobs()` / `saveJobs(jobs)`
  - `getStoredApplications()` / `saveApplications(applications)`
  - `getStoredRatings()` / `saveRatings(ratings)`

## Data Persistence

The app uses browser localStorage to persist data:
- User sessions
- Job postings
- Applications
- Ratings

**Note**: This is for demo purposes only. In production, replace with actual backend API calls.

## Styling

### CSS Variables

Global CSS variables are defined in `src/index.css`:
- `--primary-color`: Main brand color (#2563eb)
- `--secondary-color`: Accent color (#10b981)
- `--accent-color`: Rating/warning color (#f59e0b)
- `--text-primary`: Main text color
- `--text-secondary`: Secondary text color
- `--bg-primary`: Primary background
- `--bg-secondary`: Secondary background
- `--border-color`: Border color
- `--shadow`, `--shadow-md`, `--shadow-lg`: Box shadows

### Responsive Design

- Mobile-first approach
- Breakpoint at 768px
- Grid layouts adapt to screen size
- Navigation collapses on mobile

## Routing

Protected routes require authentication:
- `/dashboard` - User dashboard (youth users)
- `/employer-dashboard` - Employer dashboard

Public routes:
- `/` - Home page
- `/jobs` - Job listings
- `/login` - Login page
- `/signup` - Signup page

## Future Backend Integration

When integrating with a backend API:

1. **Replace Mock Services**: Update functions in `src/services/jobService.js` to make actual API calls
2. **Update AuthContext**: Replace mock authentication with real API endpoints
3. **Remove localStorage**: Replace with server-side data persistence
4. **Add Error Handling**: Implement proper error handling for API failures
5. **Add Loading States**: Enhance loading indicators for async operations
6. **Environment Variables**: Use environment variables for API URLs

### Example API Integration

```javascript
// Replace in jobService.js
export const fetchJobs = async () => {
  const response = await fetch(`${API_URL}/jobs`)
  if (!response.ok) throw new Error('Failed to fetch jobs')
  return await response.json()
}
```

## Accessibility

The app includes:
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly labels
- Proper form labeling
- Focus indicators

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy to Vercel

This project is configured for easy deployment on Vercel:

#### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project directory:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

#### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

#### Configuration

The project includes a `vercel.json` file that:
- Configures Vite build settings
- Sets up proper routing for React Router (SPA)
- Ensures all routes redirect to `index.html` for client-side routing

**Note:** The build output directory is `dist/` as configured by Vite.

#### Environment Variables

If you need to add environment variables (for future backend integration):
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add your variables (e.g., `VITE_API_URL`)

## License

This project is part of a development portfolio.

## Contributing

This is a frontend-only implementation using mock data. For production use, integrate with a proper backend API.

---

**Note**: This is a mock implementation. All authentication, data persistence, and API calls are simulated using localStorage and placeholder functions.