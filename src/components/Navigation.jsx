import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FaHome, FaBriefcase, FaUser, FaSignOutAlt } from 'react-icons/fa'
import './Navigation.css'

const Navigation = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" aria-label="Hustle Hapa Home">
          <span className="brand-icon">💼</span>
          <span className="brand-text">Hustle Hapa</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            <FaHome aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link to="/jobs" className="navbar-link">
            <FaBriefcase aria-hidden="true" />
            <span>Jobs</span>
          </Link>

          {user ? (
            <>
              {user.role === 'employer' ? (
                <Link to="/employer-dashboard" className="navbar-link">
                  <FaUser aria-hidden="true" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link to="/dashboard" className="navbar-link">
                  <FaUser aria-hidden="true" />
                  <span>Dashboard</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="navbar-link navbar-logout"
                aria-label="Log out"
              >
                <FaSignOutAlt aria-hidden="true" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                <span>Login</span>
              </Link>
              <Link to="/signup" className="btn btn-primary navbar-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
