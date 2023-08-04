import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import LoaderView from '../LoaderView'
import FailureView from '../Failure'

import './index.css'

const topRatedBooksApiStatus = {
  initial: 'INITIAL',
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 470,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const Home = () => {
  const [topRatedBooks, setTopRatedBooks] = useState([])
  const [apiStatus, setApiStatus] = useState(topRatedBooksApiStatus.initial)

  const getTopRatedBooks = async () => {
    setApiStatus(topRatedBooksApiStatus.fetching)

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {books} = data
      const formattedTopRatedBooks = books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))

      setTopRatedBooks(formattedTopRatedBooks)
      setApiStatus(topRatedBooksApiStatus.success)
    } else {
      setApiStatus(topRatedBooksApiStatus.failure)
    }
  }

  useEffect(() => {
    getTopRatedBooks()
  }, [])

  const renderLoader = () => <LoaderView />

  const renderFailureView = () => <FailureView retry={getTopRatedBooks} />

  const renderTopRatedBooksView = () => (
    <div className="slider-container">
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => (
          <div className="top-rated-book-wrapper" key={eachBook.id}>
            <Link to={`/books/${eachBook.id}`} className="link-item">
              <img
                src={eachBook.coverPic}
                className="top-rated-book-cover-pic"
                alt={eachBook.title}
                loading="lazy"
              />

              <h2 className="top-rated-book-title">{eachBook.title}</h2>
              <p className="top-rated-book-author">{eachBook.authorName}</p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )

  const renderTopRatedBooks = () => {
    switch (apiStatus) {
      case topRatedBooksApiStatus.fetching:
        return renderLoader()

      case topRatedBooksApiStatus.failure:
        return renderFailureView()

      case topRatedBooksApiStatus.success:
        return renderTopRatedBooksView()

      default:
        return null
    }
  }

  return (
    <div className="home-page">
      <Header />
      <div className="home-content">
        <div className="home-banner">
          <h2 className="home-banner-heading">
            Find Your Next Favorite Books?
          </h2>
          <p className="home-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf" className="link-item">
            <button type="button" className="find-books-btn sm-btn">
              Find Books
            </button>
          </Link>
        </div>
        <div className="top-rated-books-container">
          <div className="top-rated-books-header-wrapper">
            <h3 className="top-rated-books-title">Top Rated Books</h3>
            <Link to="/shelf" className="link-item">
              <button type="button" className="find-books-btn md-btn">
                Find Books
              </button>
            </Link>
          </div>
          {renderTopRatedBooks()}
        </div>
      </div>
      <div className="home-footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default Home
