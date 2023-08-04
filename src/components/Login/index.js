import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const loginApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const LoginPage = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState(loginApiStatus.initial)
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const authenticateUser = async () => {
    const {history} = props
    const bodyDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(bodyDetails),
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 10})
      history.replace('/')
    } else {
      console.log(response)
      setLoginStatus(loginApiStatus.failure)
      setErrorMsg(response.error_msg)
    }
  }

  const isFormValid = () => {
    if (username !== '' && password !== '') {
      return true
    }
    return false
  }

  const onFormSubmit = e => {
    e.preventDefault()
    authenticateUser()
    setUsername('')
    setPassword('')
  }

  const renderLoginForm = () => (
    <form className="login-form" onSubmit={onFormSubmit}>
      <img
        src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690445946/BookHub_Logo_uc3iga.svg"
        className="login website logo"
        alt="book hub"
      />

      <div className="input-field-container">
        <label htmlFor="username" className="input-label">
          Username*
        </label>
        <input
          id="username"
          className="user-input"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="input-field-container">
        <label htmlFor="password" className="input-label">
          Password*
        </label>
        <input
          id="password"
          className="user-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="check-box-container">
          <input
            id="checkBox"
            type="checkbox"
            className="check-box"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="checkBox" className="check-box-label">
            Show Password
          </label>
        </div>

        {loginStatus === 'FAILURE' && <p className="error-msg">{errorMsg}</p>}
      </div>

      <button
        type="submit"
        className={
          isFormValid() ? 'submit-button' : 'submit-button disabled-btn'
        }
        disabled={!isFormValid()}
      >
        Login
      </button>
    </form>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-page">
      <div className="md-login-page-img-wrapper">
        <img
          className="md-login-img"
          alt="website login"
          src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690380429/Group_Rectangle_Home_md_eus5ik.svg"
        />
      </div>
      <div className="sm-login-img-wrapper">
        <img
          className="sm-login-img"
          alt="website login"
          src="https://res.cloudinary.com/dp8iuoezz/image/upload/v1690380429/Group_Ellipse_99_home_qm2xbx.svg"
        />
      </div>
      <div className="login-form-container">{renderLoginForm()} </div>
    </div>
  )
}

export default LoginPage
