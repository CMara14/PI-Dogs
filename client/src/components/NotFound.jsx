import React from 'react'
// import { useDispatch } from 'react-redux'
import icon from "../assets/kiss.png"

export default function NotCreated() {
    // const dispatch = useDispatch()

// function handleRefresh (e) {
// dispatch(getAllDogs())
//     }

  return (
    <div className='notFound'>
      {/* <button className='buttonRefresh' onClick={e => handleRefresh(e)}>Refresh</button> */}
    <img src={icon} alt="Dogs not found" />
      <h1>Dogs not found</h1>
    </div>
  )
}
