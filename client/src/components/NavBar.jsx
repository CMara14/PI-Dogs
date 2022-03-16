import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import runningDog from "../assets/runningDog.gif";
import { getAllDogs } from "../redux/actions";
import { useDispatch } from "react-redux";

import "../styles/NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleRefresh(e) {
    dispatch(getAllDogs());
  }

  return (
    <div className="navbar">
        <div>
          <NavLink  className="dogsApp" to="/">
                          <h1>Dogs <br /> App</h1>
                       </NavLink>
        </div>
      <div className="search">
        <SearchBar />
      </div>
     
        <div>
          <button className="refreshNavBar" onClick={(e) => handleRefresh(e)}>
            Refresh 
          </button>
        </div>
            <div className="contenedorCreate">
        <img className="navLogo" src={runningDog} alt="runningDog" />
        <NavLink to="/dog">
          <button className="create">Create your Dog</button>
        </NavLink>
      </div>
    </div>
  );
}
