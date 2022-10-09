import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../img/LOGO.jpg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="LOGO" />
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
          <span>Cathy</span>
          <span>Logout</span>
          <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar