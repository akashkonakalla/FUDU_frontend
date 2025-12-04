import React from 'react'
import { Link } from 'react-router-dom'


const TopBar = () => {
  return (
    <section className="topBarSection">
      <div className="companyTitle">
        <Link to='/' className='link'>
          <h2>FUDU</h2>
        </Link>
      </div>

      <div className="searchBar">
        <input type="text" placeholder='Search...' />
      </div>

      <div className="userAuth">
        <Link to="/login" className="loginBtn">Login</Link>
        <Link to="/register" className="registerBtn">Register</Link>
        
      </div>
    </section>
  )
}

export default TopBar
