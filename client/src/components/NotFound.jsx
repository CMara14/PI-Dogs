import React from 'react'
// import { useDispatch } from 'react-redux'
import icon from "../assets/kiss.png"

import "../styles/NotFound.css"

export default function NotFound() {
    // const dispatch = useDispatch()

// function handleRefresh (e) {
// dispatch(getAllDogs())
//     }

  return (
    <div className='notFound'>
      {/* <button className='buttonRefresh' onClick={e => handleRefresh(e)}>Refresh</button> */}
    <img src={icon} alt="Dogs not found" />
      <h1 className='titleNotfound'>Dogs not found</h1>
    </div>
  )
}
