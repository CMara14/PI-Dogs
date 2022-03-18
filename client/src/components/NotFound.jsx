import React from 'react'
import icon from "../assets/kiss.png"

import "../styles/NotFound.css"

export default function NotFound() {

  return (
    <div className='notFound'>
    <img src={icon} alt="Dogs not found" />
      <h1 className='titleNotfound'>Dogs not found</h1>
    </div>
  )
}
