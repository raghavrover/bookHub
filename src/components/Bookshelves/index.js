import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import LoaderView from '../LoaderView'
import FailureView from '../Failure'
import './index.css'

const fetchBooksApiStatus = {
  initial: 'INITIAL',
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

// Medium Shelf Item Component
const MdShelfItem = ({shelf, getShelf, isActiveShelf}) => {
  const {label, value} = shelf

  const onShelfSelect = () => {
    getShelf(value)
  }

  return (
    <li
      className={`md-bookshelf-list-item  ${
        isActiveShelf ? 'active-md-list-item ' : ''
      }`}
      onClick={onShelfSelect}
    >
      {label}
    </li>
  )
}

// Small Shelf Item Component
const SmShelfItem = ({shelf, getShelf, isActiveShelf}) => {
  const {label, value} = shelf

  const onShelfSelect = () => {
    getShelf(value)
  }

  return (
    <li>
      <button
        type="button"
        className={`bookshelf-btn ${isActiveShelf ? 'selected-btn' : ''}`}
        onClick={onShelfSelect}
      >
        {label}
      </button>
    </li>
  )
}

// Book Item Component
const BookItem = ({bookDetails}) => {
  const {id, coverPic, title, authorName, rating, readStatus} = bookDetails

  return (
    <li className="list-item">
      <Link to={`/books/${id}`} className="link-item">
        <div className="list-item-wrapper">
          <img
            src={coverPic}
            alt={title}
            loading="lazy"
            className="book-cover"
          />
          <div className="book-details-wrapper">
            <h3 className="book-title">{title}</h3>
            <p className="book-author">{authorName}</p>
            <div className="rating-container">
              <p className="avg-rating">Avg Rating </p>
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
            <p className="book-read-status">
              Status: <span className="read-status">{readStatus}</span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

// Book Shelves Page Component
const Bookshelves = () => {
  const [allBooks, setAllBooks] = useState([])
  const [searchText, setSearchText] = useState('')
  const [bookshelf, setBookshelf] = useState(bookshelvesList[0].value)
  const [apiStatus, setApiStatus] = useState(fetchBooksApiStatus.initial)

  const getAllBooks = async () => {
    setApiStatus(fetchBooksApiStatus.fetching)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelf}&search=${searchText}`
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
      const formattedBooks = books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))
      setAllBooks(formattedBooks)
      setApiStatus(fetchBooksApiStatus.success)
    } else {
      setApiStatus(fetchBooksApiStatus.failure)
      console.log(response)
    }
  }

  useEffect(() => {
    getAllBooks()
  }, [bookshelf])

  const getSelectedCategoryBooks = shelf => {
    setBookshelf(shelf)
  }

  const getSearchText = e => {
    setSearchText(e.target.value)
  }

  const renderSearchBar = () => (
    <div className="search-bar">
      <input
        type="search"
        value={searchText}
        onChange={getSearchText}
        className="book-search-input"
      />
      <button
        type="button"
        className="search-btn"
        testid="searchButton"
        onClick={getAllBooks}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const renderNoBooksView = () => (
    <div className="no-book-results-view">
      <img
        src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690442592/Asset_1_1_y9ufpa.svg"
        alt="no books"
        className="no-results-img"
      />
      <p className="no-results-description">{`Your search for ${searchText} did not find any matches.`}</p>
    </div>
  )

  const renderBooksView = () => {
    const {label} = bookshelvesList.find(shelf => shelf.value === bookshelf)

    return (
      <div className="books-container">
        <div className="books-header-container">
          <h1 className="shelf-books-title">{label} Books</h1>
          {renderSearchBar()}
        </div>
        {allBooks?.length > 0 ? (
          <ul className="books-list">
            {allBooks.map(eachBook => (
              <BookItem bookDetails={eachBook} key={eachBook.id} />
            ))}
          </ul>
        ) : (
          renderNoBooksView()
        )}
      </div>
    )
  }
  const renderLoader = () => <LoaderView />

  const renderFailure = () => <FailureView retry={getAllBooks} />

  const renderBooks = () => {
    switch (apiStatus) {
      case fetchBooksApiStatus.fetching:
        return renderLoader()

      case fetchBooksApiStatus.failure:
        return renderFailure()

      case fetchBooksApiStatus.success:
        return renderBooksView()

      default:
        return null
    }
  }

  const renderSideBar = () => (
    <div className="side-bar">
      <div className="md-bookshelves-container">
        <h2 className="md-bookshelves-title">Bookshelves</h2>
        <ul className="md-bookshelves-list">
          {bookshelvesList.map(eachShelf => (
            <MdShelfItem
              shelf={eachShelf}
              getShelf={getSelectedCategoryBooks}
              isActiveShelf={bookshelf === eachShelf.value}
              key={eachShelf.id}
            />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )

  const renderSmBookshelves = () => (
    <div className="sm-bookshelves-container">
      <div className="sm-search-bar-container">{renderSearchBar()}</div>
      <h2 className="sm-bookshelves-title">Bookshelves</h2>
      <ul className="sm-bookshelves-list">
        {bookshelvesList.map(eachShelf => (
          <SmShelfItem
            shelf={eachShelf}
            getShelf={getSelectedCategoryBooks}
            isActiveShelf={bookshelf === eachShelf.value}
            key={eachShelf.id}
          />
        ))}
      </ul>
    </div>
  )

  const renderBookshelvesContent = () => (
    <div className="bookshelves-page-content">
      {renderSmBookshelves()}
      {renderSideBar()}
      {renderBooks()}
    </div>
  )

  return (
    <div className="bookshelves-page">
      <Header />
      {renderBookshelvesContent()}
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default Bookshelves
