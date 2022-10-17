import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../img/LOGO.jpg'

const Navbar = () => {

  const {currentUser,logout} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="LOGO" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=food">
          <h6>Food</h6></Link>
          <Link className='link' to="/?cat=travel">
          <h6>Travel</h6></Link>
          <Link className='link' to="/?cat=cloth">
          <h6>Cloth</h6></Link>
          <Link className='link' to="/?cat=photo">
          <h6>Photo</h6></Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
              <span onClick={logout}>Logout</span>
            ) : (
              <Link className='link' to="/login">Login</Link>
            )}
          <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar