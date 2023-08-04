import './index.css'

const FailureView = props => {
  const {retry} = props
  return (
    <div className="failure-view-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690380429/Group_Failure_cat_nqtco9.svg"
        alt="failure view"
      />
      <h2 className="failure-msg">Something went wrong. Please try again</h2>
      <p className="failure-suggestion">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button className="retry-button" type="button" onClick={retry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
