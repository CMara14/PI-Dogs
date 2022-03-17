import React from 'react'
import { NavLink } from "react-router-dom";
import icon from "../assets/NotFoundfondo.png"

import "../styles/ErrorURL.css"

export default function ErrorURL() {

  return (
    <div>     
      <h1 className='titleErrorUrl'>where do you want to go?</h1> 
      <NavLink to="/">
      <img src={icon} alt="" />
      <button className=''>Return</button>
      </NavLink>
    </div>    
  )
}
