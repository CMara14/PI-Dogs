import React from "react";
import { useState } from "react"; 

import { useDispatch } from "react-redux"; 

import { getDogName } from "../redux/actions"; 
import "../styles/SearchBar.css";
import icon from "../assets/huellasinfondo.png";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //FUNCIONES DE LOS EVENTOS:
  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value); 
    console.log(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 1 && /^[A-Z ]+$/i.test(name) ) {
      dispatch(getDogName(name)); 
      setName(""); 
    } else {
      alert("Please enter a valid name");
    }
  };

  return (
    <div className="searchBar">
      <form onSubmit={(e) => handleSubmit(e)} className="searchBox">
        <input
          className="inputSearch"
          type="text"
          placeholder="Find your favorite dog..."
          onChange={(e) => handleInputChange(e)}
          value={name}
        />
        <button className="searchButton" type="submit">
          <img className="iconSearch" src={icon} alt="" />
        </button>
      </form>
    </div>
  );
}
