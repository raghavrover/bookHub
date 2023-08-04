import {useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'

import './index.css'

const Header = props => {
  const [sideMenu, setSideMenu] = useState(false)

  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')

    // to make sure body scrolls when user logouts with devices width less than 768px(since side menu is available to only those range of devices )
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    document.body.style.overflow = sideMenu ? 'hidden' : 'auto'
  }, [sideMenu])

  const toggleMenu = () => {
    setSideMenu(prev => !prev)
  }

  const renderSideMenu = () => (
    <>
      <div className={`side-menu ${sideMenu ? 'slide' : ''}`}>
        <button className="close-btn" type="button" onClick={toggleMenu}>
          <IoMdClose className="close-icon" />
        </button>
        <ul className="side-menu-list">
          <li className="side-menu-item">
            <Link to="/" className="link-item">
              <p className="side-menu-list-item">Home</p>
            </Link>
          </li>
          <li className="side-menu-item">
            <Link to="/shelf" className="link-item">
              <p className="side-menu-list-item">Bookshelves</p>
            </Link>
          </li>
          <li className="side-menu-item">
            <p className="side-menu-list-item" onClick={onLogout}>
              Logout
            </p>
          </li>
        </ul>
      </div>
      {sideMenu && (
        <div
          className="overlay"
          role="button"
          tabIndex="0"
          onClick={toggleMenu}
        >
          {}
        </div>
      )}
    </>
  )

  const renderHeaderMenu = () => (
    <ul className="nav-item-list">
      <li className="nav-item">
        <Link to="/" className="link-item">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/shelf" className="link-item">
          Bookshelves
        </Link>
      </li>
      <li className="nav-item">
        <button className="logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </li>
    </ul>
  )

  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690445946/BookHub_Logo_uc3iga.svg"
            className="book-hub-logo"
            alt="website logo"
          />
        </Link>

        <button type="button" className="menu-btn" onClick={toggleMenu}>
          <img
            src=" https://res.cloudinary.com/dp8iuoezz/image/upload/v1690631646/menu_lbmerg.svg"
            className="menu-icon"
            alt="menu"
          />
        </button>
        {renderSideMenu()}
        {renderHeaderMenu()}
      </div>
    </nav>
  )
}

export default withRouter(Header)
