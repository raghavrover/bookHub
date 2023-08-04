import {Link} from 'react-router-dom'
import './index.css'

const Footer = () => (
  <div className="footer">
    <div className="icons-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690631646/twitter_vgendo.svg"
          alt="facebook"
          className="icon-img"
        />
      </Link>

      <Link to="/">
        <img
          src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690631646/instagram_flb0ri.svg"
          alt="facebook"
          className="icon-img"
        />
      </Link>

      <Link to="/">
        <img
          src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690631646/google_qhjer2.svg"
          alt="facebook"
          className="icon-img"
        />
      </Link>

      <Link to="/">
        <img
          src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690631646/youtube_k17gk5.svg"
          alt="facebook"
          className="icon-img"
        />
      </Link>
    </div>
    <p className="contact-us-title">Contact us</p>
  </div>
)

export default Footer
