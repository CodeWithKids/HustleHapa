import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './Rating.css'

/**
 * Rating Component
 * Displays or allows input of star ratings
 * @param {number} rating - Current rating (0-5)
 * @param {boolean} editable - Whether the rating can be edited
 * @param {Function} onRate - Callback when rating is changed (editable mode)
 * @param {number} size - Size of stars ('small' | 'medium' | 'large')
 */
const Rating = ({ rating = 0, editable = false, onRate, size = 'medium' }) => {
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleClick = (value) => {
    if (editable && onRate) {
      onRate(value)
    }
  }

  const handleMouseEnter = (value) => {
    if (editable) {
      setHoveredRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (editable) {
      setHoveredRating(0)
    }
  }

  const displayRating = hoveredRating || rating

  return (
    <div
      className={`rating rating-${size} ${editable ? 'rating-editable' : ''}`}
      role={editable ? 'slider' : 'img'}
      aria-label={editable ? `Rate ${rating} out of 5` : `Rating: ${rating} out of 5`}
      aria-valuenow={rating}
      aria-valuemin={0}
      aria-valuemax={5}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type={editable ? 'button' : undefined}
          className={`rating-star ${value <= displayRating ? 'rating-filled' : 'rating-empty'}`}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          disabled={!editable}
          aria-label={`${value} star${value !== 1 ? 's' : ''}`}
          aria-hidden={!editable}
        >
          <FaStar />
        </button>
      ))}
      {rating > 0 && (
        <span className="rating-value" aria-hidden="true">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default Rating
