import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page">
    <img
      src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690380429/Group_Page_not_found_u3rlqb.svg"
      alt="Page Not Found"
      className="not-found-img"
    />
    <h2 className="not-found-title">Page Not Found</h2>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found, <br />
      Please go back to the homepage.
    </p>
    <Link to="/" className="link-item">
      <button type="button" className="go-home-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
