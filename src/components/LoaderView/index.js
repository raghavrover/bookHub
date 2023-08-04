import Loader from 'react-loader-spinner'
import './index.css'

const LoaderView = () => (
  <div className="loader-container" testid="loader">
    <Loader type="TailSpin" height="50" width="50" color="#0284c7" />
  </div>
)

export default LoaderView
