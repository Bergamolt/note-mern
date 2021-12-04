import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

import './Navbar.scss'

export default function Navbar() {
  const { logout, isLogin } = useContext(AuthContext)

  return (
    <nav>
      <div className="nav-wrapper navbar">
        <a href="/" className="brand-logo">Note App</a>
        {
          isLogin
            ? <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/" onClick={logout} >LOG OUT</a></li>
              </ul>
            : <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/">SIGN IN</a></li>
              </ul>
        }
      </div>
    </nav>
  )
}