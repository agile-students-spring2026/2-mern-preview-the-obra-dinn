import { useState, useEffect } from 'react'
import './About.css'

/**
 * A React component that displays the About Us page with content fetched from the backend.
 * @returns The contents of this component, in JSX form.
 */
const About = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch the about data from the backend
    const fetchAboutData = async () => {
      try {
        const response = await fetch('http://localhost:5002/about_us')
        const data = await response.json()
        setAboutData(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching about data:', err)
        setError('Failed to load about information')
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  if (loading) {
    return <div className="About-container"><p>Loading...</p></div>
  }

  if (error) {
    return <div className="About-container"><p>{error}</p></div>
  }

  if (!aboutData) {
    return <div className="About-container"><p>No about information available</p></div>
  }

  return (
    <div className="About-container">
      <h1>{aboutData.title}</h1>
      <div className="About-content">
        <div className="About-image-container">
          <img src={aboutData.imageUrl} alt={aboutData.imageDescription} className="About-image" />
          {aboutData.imageDescription && <p className="About-image-caption">{aboutData.imageDescription}</p>}
        </div>
        <div className="About-text">
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
