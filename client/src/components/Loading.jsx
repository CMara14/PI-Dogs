import React from 'react'
import loadinggif from "../assets/loading.gif"

export default function Loading() {
  return (
    
        <div className="loader">
            <img src={loadinggif} className="loading" alt="loading"/>
        </div>
  )
}
