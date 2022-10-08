import React from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
          <input required type="text" placeholder='username' />
          <input required type="password" placeholder='password' />
          <button>Login</button>
          <p>忘記密碼</p>
          <span>尚未有帳號?<Link to="/register">Register</Link>
          </span>
        </form>
    </div>
  )
}

export default Login