import React from 'react'
import { NavLink } from "react-router-dom";
import icon from "../assets/NotFoundfondo.png"


export default function NotFound() {

  return (
    <div>     
      <h1>The url you are trying to access does not exist</h1> 
      <NavLink to="/">
      <button className=''>Return</button>
      <img src={icon} alt="" />
      </NavLink>
    </div>    
  )
}
