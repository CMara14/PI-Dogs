import React from 'react'
import { NavLink } from "react-router-dom";
import icon from "../assets/NotFoundfondo.png"

import "../styles/ErrorURL.css"

export default function ErrorURL() {

  return (
    
    <div>
      <div >     
      <h1 className='titleErrorUrl'>ERROR 404: URL not found</h1> 
      <img src={icon} alt="" />
    </div>
    <div className='containerError'>
      <NavLink to="/">
      <button className='return'>Return</button>
      </NavLink>
    </div>
    </div>    
  )
}
