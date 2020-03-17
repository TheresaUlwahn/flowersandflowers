import React from 'react'
import './header.css'

export const Header = () => {

  return (
    <div className="container">    
      <nav className="navbar">
        {/* Empty link for future menu pages  */}
        <a href="#">Home</a>
        <a href="#">About us</a>
        <a href="#">Subscribe</a>
      </nav>
      {/* Creating a hamburger menu with lines, made by divs */}
      <div className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      <h1>Les Fleures - <br/> Get your green fingers inspired!</h1>
      {/* Empty link for future sign up  */}
      <a href="#">Sign up now</a>
    </div>
  )
}