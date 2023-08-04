import {useState, useEffect} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Header from '../Header'
import LoaderView from '../LoaderView'
import FailureView from '../Failure'
import './index.css'
import '../Bookshelves/index.css'

const bookDetailsApiStatus = {
  initial: 'INITIAL',
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const BookDetails = ({match}) => {
  const [bookDetails, setBookDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(bookDetailsApiStatus.initial)

  const fetchBookDetails = async () => {
    setApiStatus(bookDetailsApiStatus.fetching)
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        authorName: data.book_details.author_name,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      setApiStatus(bookDetailsApiStatus.success)
      setBookDetails({...formattedData})
    } else {
      setApiStatus(bookDetailsApiStatus.failure)
    }
  }

  useEffect(() => {
    fetchBookDetails()
  }, [])

  const renderBookDetailsView = () => {
    const {
      authorName,
      aboutAuthor,
      aboutBook,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookDetails

    return (
      <div className="book-details">
        <div className="book-data">
          <img src={coverPic} alt={title} className="book-details-cover-img" />
          <div className="book-details-page-wrapper">
            <h3 className="book-details-page-title">{title}</h3>
            <p className="book-details-page-author">{authorName}</p>
            <div className="rating-container">
              <p className="book-avg-rating-title">Avg rating </p>
              <AiFillStar className="star-icon" />
              <p className="book-avg-rating">{rating}</p>
            </div>
            <p className="book-page-read-status">
              Status:{' '}
              <span className="book-details-read-status">{readStatus}</span>
            </p>
          </div>
        </div>{' '}
        <div className="about-author-wrapper">
          <h3 className="about-author-title">About Author</h3>
          <p className="about-author-description">{aboutAuthor}</p>
        </div>
        <div className="about-author-wrapper">
          <h3 className="about-author-title">About Book</h3>
          <p className="about-author-description">{aboutBook}</p>
        </div>
      </div>
    )
  }

  const renderLoader = () => <LoaderView />

  const renderFailure = () => <FailureView retry={fetchBookDetails} />

  const renderBookDetails = () => {
    switch (apiStatus) {
      case bookDetailsApiStatus.fetching:
        return renderLoader()

      case bookDetailsApiStatus.failure:
        return renderFailure()

      case bookDetailsApiStatus.success:
        return renderBookDetailsView()

      default:
        return null
    }
  }

  return (
    <div className="book-details-page">
      <Header />
      <div className="book-details-content">{renderBookDetails()}</div>
    </div>
  )
}

export default BookDetails
